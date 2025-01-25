

import { Repairs, RepairStatus } from "../../data/postgres/models/repairs.model";
import { CreateServicesDTO, CustomError } from "../../domain";
import { UsersService } from "./usersService";


export class RepairService {
    constructor(
      public readonly usersService: UsersService
    ) {}


    async findAllService() {

            try {
              return await Repairs.find({
                 where: {
                     repairStatus: RepairStatus.PENDING
                 },
                 relations: ['user'],
                 select: {
                  user: {
                    name: true,
                    email: true,
                    role: true,
                    id: true,
                    status: true

                  }
                 }
              });
            } catch (error) {
              throw CustomError.internalServed("Error obteniendo datos")
            }
    }

    async findIdService(id: string){
      const repair = await Repairs.findOne({
        where: {
          id,
          repairStatus: RepairStatus.PENDING
        },
      });

      if(!repair) {
        throw CustomError.notFound("User not found")
      }
      return repair
        
    }

    async createService(repairsData: CreateServicesDTO) {
        
        const repairs = new Repairs();

        const user = await this.usersService.findIdUser(repairsData.userId)

        repairs.date = repairsData.date
        repairs.motorsNumber = repairsData.motorsNumber;
        repairs.description = repairsData.description;
        repairs.user = user;
        
         try {
           return await repairs.save();
           
         } catch (error) {
           throw new Error("Error generando la cita")
         }
    }

    async updateService(id: string){
      const service = await this.findIdService(id)

      service.repairStatus = RepairStatus.COMPLETED;
  
      try {
         await service.save();
  
       return {
        message: "Repair completed",
        motorsNumber: service.motorsNumber, 
       }
      } catch (error) {
        throw CustomError.internalServed("Error actualizando el usuario")
      }
    }

    async deleteService(id: string){
      const service = await this.findIdService(id);

      service.repairStatus = RepairStatus.CANCELLED

      try {
         await service.save();

        return {
          message: "Reparación cancelada",
          motorsNumber: service.motorsNumber
        }
      } catch (error) {
        throw CustomError.internalServed("Error eliminando el usuario")
      }
    }
}