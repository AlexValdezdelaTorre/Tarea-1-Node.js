import { Request, Response } from "express"
import { RepairService } from "../services/repairsService";
import { CreateServicesDTO,  CustomError, UpdateServicesDTO } from "../../domain";


export class RepairsController {

    constructor(private readonly repairService: RepairService){}

    private handleError = (error: unknown, res: Response) => {
          if (error instanceof CustomError ) {
            return res.status(error.statusCode).json({ message: error.message});
    
          };
          console.log(error);
          return res.status(500).json({ message: "Internal served error 💩"})
        }

    findAllService = async (req: Request, res: Response) => {
        this.repairService.findAllService()
        .then((data) => {
            return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))
    };  

    findIdService = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.repairService.findIdService(id)
        .then((data) => {
           return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))  
    };  

    createService = /*async*/ ( req: Request, res: Response) => {
        const [error, createServiceDto] = CreateServicesDTO.create(req.body)
    
        if(error) return res.status(422).json({ message: error});

        this.repairService.createService( createServiceDto!)
        .then((data) => {
            return res.status(201).json(data);
        })
        .catch((error: any) => this.handleError(error, res))
    };

    updateService = async (req: Request, res: Response) => {
        const { id } = req.params;
         /*const [ error, updateServicesDTO] = UpdateServicesDTO.create(req.body)
                
                if(error) return res.status(422).json({ message: error});*/
               
               this.repairService.updateService(id)
               .then((data: any) => {
                   return res.status(200).json(data)
               })
                .catch((error: unknown) => this.handleError(error,res)) 
    };   

    deleteService = (req: Request, res: Response) => {
        const { id } = req.params;
        this.repairService.deleteService(id)
        .then((data: any) => {
            return res.status(204).json(data)
        })
        .catch((error: unknown) => this.handleError(error, res))   
    }  
}
