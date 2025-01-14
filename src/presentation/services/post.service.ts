
import { Repairs } from "../../data/postgres/models/repairs.model";
import { Users } from "../../data/postgres/models/users.model"
//import { CreateUsersDTO } from "../../domain";



export class PostService {
    constructor() {}


    //repairs

    async findAllService() {
        
        return {
            message: "Listado de motos a reparar",
        }
            /*try {
              return await Repairs.find({
                 where: {
                     status: true,
                 }
              })
            } catch (error) {
              throw new Error("Error buscando el servicio")
            }*/
    }

    async findAIdServices(){
        /*return {
            message: "Buscando Id"
        }*/
    }

    async createService(repairData: any) {
        
        const repairs = new Repairs()
        repairs.status = repairData.status;
        
         try {
           const createdService = await repairs.save();
           return createdService
         } catch (error) {
           throw new Error("Error creando el usuario")
         }
    }

    async updateStatus(){
        return {
            message: "Actualizar status"
        }
    }

    async cancelRepair(){
        return {
            message: "Cita cancelada"
        }
    }


    //Users
    async findAllUsers() {
            try {
              return await Users.find({
                 where: {
                     status: true,
                 }
              })
            } catch (error) {
              throw new Error("Error creando el post")
            }
    }

    async findIdUser(id: string){
      const user = await Users.findOne({
        where: {
          id,
          status: true,
        },
      });

      if(!user) {
        throw new Error("User not found")
      }
      return user
      }
       
    async createUser(usersData: any /*CreateUsersDTO*/) { 
      const users = new Users()

      users.name = usersData.name;
      users.email = usersData.email;
      users.password = usersData.password;
      users.rol = usersData.rol;

       try {
         return await users.save();
       } catch (error) {
         throw new Error("Error creando el usuario")
       }
    }

    async updateUser(id: string, usersData: any){
        const user = await this.findIdUser(id)

        user.name = usersData.name.trim()
        user.email = usersData.email.toLowerCase().trim()

        try {
          return await user.save()
        } catch (error) {
          throw new Error("Error actualizando el usuario")
        }
    }

    async deleteUser(id: string){
        const userId = await this.findIdUser(id)

        userId.status = false;

        try {
          userId.save()
        } catch (error) {
          throw new Error("Error actualizando el usuario")
        }
    }
}