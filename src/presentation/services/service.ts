
import { Repairs } from "../../data/postgres/models/repairs.model";
import { Users } from "../../data/postgres/models/users.model"
import { CreateUsersDTO, CustomError, UpdateUsersDTO } from "../../domain";
import { UpdateServicesDTO } from "../../domain/dtos/repairs/updateService.dto";




export class PostService {
    constructor() {}


    //repairs Service

    async findAllService() {

            try {
              return await Repairs.find({
                 where: {
                     status: true,
                 }
              })
            } catch (error) {
              throw CustomError.internalServed("Error obteniendo datos")
            }
    }

    async findIdService(id: string){
      const repair = await Repairs.findOne({
        where: {
          id,
          status: true,
        },
      });

      if(!repair) {
        throw CustomError.notFound("User not found")
      }
      return repair
        
    }

    async createService(repairData: any) {
        
        const repairs = new Repairs()
        repairs.userId = repairData.userId;
        
         try {
           const createdService = await repairs.save();
           return createdService
         } catch (error) {
           throw new Error("Error creando el usuario")
         }
    }

    async updateService(id: string, repairsData: UpdateServicesDTO){
      const repair = await this.findIdService(id)

      repair.userId = repairsData.userId.trim()
      

      try {
        return await repair.save()
      } catch (error) {
        throw CustomError.internalServed("Error actualizando el usuario")
      }
    }

    async cancelService(id: string){
      const serviceId = await this.findIdService(id)

      serviceId.status = false;

      try {
        serviceId.save()
      } catch (error) {
        throw CustomError.internalServed("Error eliminando el usuario")
      }
    }


    //Users Service
    async findAllUsers() {
            try {
              return await Users.find({
                 where: {
                     status: true,
                 }
              })
            } catch (error) {
              throw CustomError.internalServed("Error obteniendo datos")
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
        throw CustomError.notFound("User not found")
      }
      return user
    }
       
    async createUser(usersData:  CreateUsersDTO) { 
      const users = new Users()

      users.name = usersData.name;
      users.email = usersData.email;
      users.password = usersData.password;
      users.rol = usersData.rol;

       try {
         return await users.save();
       } catch (error) {
         throw CustomError.internalServed("Error creando el usuario")
       }
    }

    async updateUser(id: string, usersData: UpdateUsersDTO){
        const user = await this.findIdUser(id)

        user.name = usersData.name.trim()
        user.email = usersData.email.toLowerCase().trim()

        try {
          return await user.save()
        } catch (error) {
          throw CustomError.internalServed("Error actualizando el usuario")
        }
    }

    async deleteUser(id: string){
        const userId = await this.findIdUser(id)

        userId.status = false;

        try {
          userId.save()
        } catch (error) {
          throw CustomError.internalServed("Error eliminando el usuario")
        }
    }
}