
import { Repairs, RepairStatus } from "../../data/postgres/models/repairs.model";
import { CreateServicesDTO, CustomError, UpdateServicesDTO } from "../../domain";







export class RepairService {
    constructor() {}


    //repairs Service

    async findAllService() {

            try {
              return await Repairs.find({
                 where: {
                     status: RepairStatus.PENDING
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
          status: RepairStatus.PENDING
        },
      });

      if(!repair) {
        throw CustomError.notFound("User not found")
      }
      return repair
        
    }

    async createService(data: CreateServicesDTO) {
        
        const repairs = new Repairs()

        repairs.date = data.date
        repairs.motorsNumber = data.motorsNumber;
        repairs.description = data.description
        repairs.userId = data.userId;
        
         try {
           return await repairs.save();
           //return createdService
         } catch (error) {
           throw new Error("Error creando el usuario")
         }
    }

    async updateService(id: string, /*repairsData: UpdateServicesDTO*/){
      const service = await this.findIdService(id)

      //service.userId = repairsData.userId
      //service.id = repairsData.id
      service.status = RepairStatus.COMPLETED;
  
      try {
         await service.save();
  
       return {
        message: "Repair completed",
        motorsNumber: service.motorsNumber,
        
       
        
       }
        //await service.save()
      } catch (error) {
        throw CustomError.internalServed("Error actualizando el usuario")
      }
    }

    async deleteService(id: string){
      const serviceId = await this.findIdService(id);

      serviceId.status = RepairStatus.CANCELLED

      try {
         await serviceId.save()

        return {
          message: "Reparación cancelada",
          id: serviceId.id,
          //status: serviceId.status
        }
      } catch (error) {
        throw CustomError.internalServed("Error eliminando el usuario")
      }
    }


    

}