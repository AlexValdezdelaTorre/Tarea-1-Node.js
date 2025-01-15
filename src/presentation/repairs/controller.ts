import { Request, Response } from "express"
import { PostService } from "../services/service";
import { CustomError } from "../../domain";
import { UpdateServicesDTO } from "../../domain/dtos/repairs/updateService.dto";
//import { CreateUsersDTO } from "../../domain";


export class RepairsController {

    constructor(private readonly postService: PostService){}

    private handleError = (error: unknown, res: Response) => {
          if (error instanceof CustomError ) {
            return res.status(error.statusCode).json({ message: error.message});
    
          };
          console.log(error);
          return res.status(500).json({ message: "Internal served error 💩"})
        }

    findAllService = async (req: Request, res: Response) => {
        this.postService.findAllService()
        .then((data: any) => {
            return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))
    };  

    findIdService = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.postService.findIdService(id)
        .then((data: any) => {
           return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))  
    };  

    createService = async ( req: Request, res: Response) => {
        //const [error, createUsersDto] = CreateUsersDTO.create(req.body)
        
        //if(error) return res.status(422).json({ message: error});

        this.postService.createService(req.body)
        .then((data: any) => {
            return res.status(201).json(data);
        })
        .catch((error: any) => {
            return res.status(500).json({
                message: "Internal Server Error",
                error,
            });
        });
    };

    updateService = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateServicesDTO] = UpdateServicesDTO.create(req.body)
               
               if(error) return res.status(422).json({ message: error});
               
               this.postService.updateService(id, updateServicesDTO!)
               .then((data) => {
                   return res.status(200).json(data)
               })
                .catch((error: unknown) => this.handleError(error,res)) 
    };   

deleteService = (req: Request, res: Response) => {
    const { id } = req.params;
        this.postService.deleteUser(id)
        .then((data) => {
            return res.status(200).json(null)
        })
         .catch((error) => {
            return res.status(500).json({
                message: "Internal Server Error",
                error,
            });
         });  
        };      
}