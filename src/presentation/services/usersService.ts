
import { encriptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { protecAccountOwner } from "../../config/validate-owner";
import { Status, Users } from "../../data/postgres/models/users.model"
import { CreateUsersDTO, CustomError, UpdateUsersDTO, LoginUserDTO } from "../../domain";
import { EmailService } from "./email.service";

export class UsersService {
    constructor( private readonly emailService: EmailService) {}

    async findAllUsers() {
        try {
          return await Users.find({
             where: {
                 status: Status.AVAILABLE,
             }
          })
        } catch (error) {
          throw CustomError.internalServed("Error obteniendo datos")
        }
    }

    async findIdUser(id: string){
    
      const result = await Users.createQueryBuilder("user")
         
        .where("user.id = :id", { id: id})
        .andWhere("user.status = :status", {status: Status.AVAILABLE})
        .getOne();

        if(!result) {
          throw CustomError.notFound("User not found");
        }
      
        return result;
      }
      //const query = `SELECT * FROM "users" WHERE "id" = $1`;
      //const result = await Users.query(query, [id]);
    

    async loginUser(credentials: LoginUserDTO) {
      const user = await this.findUserByEmail(credentials.email)
   
      const isMatching = encriptAdapter.compare(
      credentials.password, 
      user.password)
 
      if(!isMatching) throw CustomError.unAuthorized('Invalid Credentials');
 
      const token = await JwtAdapter.generateToken({id: user.id});
      if(!token) throw CustomError.internalServed("Error while creating JWT")
 
      return {
       token: token,
       user: {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role
       }
      }
     };
   
    async createUser(usersData: CreateUsersDTO) { 
  
      const users = new Users()

      users.name = usersData.name;
      users.email = usersData.email;
      users.password = usersData.password;
      users.role = usersData.role;

        try {
         const dbUser = await users.save();
         await this.sendEmailValidationLink(dbUser.email);

         return {
          id: dbUser.id, 
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          status: dbUser.status
         }
         } catch (error: any) {
           if(error.code === '23505'){
           throw CustomError.badRequest(`User with: ${usersData.email} email already exist`);
           }
           throw CustomError.internalServed("Error creando el usuario")
          }
    }

    async findUserByEmail(email: string){
      const user = await Users.findOne({
       where: {
        email: email,
        status: Status.AVAILABLE,
       }
      });
        if(!user) throw CustomError.notFound(`User with email: ${email} not found`);
        return user;
    }

    public sendEmailValidationLink = async (email: string) => {
      const token = await JwtAdapter.generateToken({ email }, '300s');
      const link = `http://${envs.WEBSERVICE_URL}/api/users/validate-email/${token}`;
      const html = `
      <h1>Validate your email</h1>
      <p>click on the following link to validate your email<p>
      <a href="${link}">Validate your email: ${email}</a>
      `;
      const isSent = this.emailService.sendEmail({
        to: email,
        subject: "Validate your account",
        htmlBody: html
      });
        if(!isSent) throw CustomError.internalServed("Error sending email");
        return true;
    }

    validateEmail = async (token: string) => {
      const payload = await JwtAdapter.validateToken(token);
       if(!payload) throw CustomError.badRequest("Invalid token");

       const { email } = payload as { email: string}
       if(!email) throw CustomError.internalServed("Email not in token");
       
       const user = await Users.findOne({ where : {email: email} });
       if(!user) throw CustomError.internalServed("Email  not exist");

       user.status = Status.AVAILABLE;

       try {
        await user.save();

        return {
            message: "User active"
        };
       } catch (error) {
        throw CustomError.internalServed("Something went wery wrong");
       }
    };

    async updateUser(id: string, usersData: UpdateUsersDTO, sessionUserId: string ){
      const user = await this.findIdUser(id);

      const isOwner = protecAccountOwner(user.id, sessionUserId);
      if(!isOwner) throw CustomError.unAuthorized("You are not the owner of this account");
      

      user.name = usersData.name.trim()
      user.email = usersData.email.toLowerCase().trim()

      try {
        const dbUser = await user.save();
        
       return {
        name: dbUser.name,
        email: dbUser.email,
       };
      } catch (error) {
      throw CustomError.internalServed("Error actualizando el usuario")
      }
    }

    async deleteUser(id: string, sessionUserId: string){
      const userId = await this.findIdUser(id);

      const isOwner = protecAccountOwner(userId.id, sessionUserId);
      if(!isOwner) throw CustomError.unAuthorized("You are not the owner of this account");

      userId.status = Status.DISABLED;

      try {
        userId.save()

        return {
        id: userId.id,
        status: userId.status
        }
      } catch (error) {
      throw CustomError.internalServed("Error eliminando el usuario")
      }
    }
} 
  

