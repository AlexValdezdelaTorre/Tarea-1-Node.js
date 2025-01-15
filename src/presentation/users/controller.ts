import { Request, Response } from "express"
import { FunctionService } from "../services/functionService";
import { CustomError, UpdateUsersDTO } from "../../domain";
import { CreateUsersDTO } from "../../domain/dtos/users/createUser.dto";



export class UserController {
    constructor(private readonly functionService: FunctionService){}
    
    private handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message});

      };
      console.log(error);
      return res.status(500).json({ message: "Internal served error 💩"})
    }

    findAllUsers = async (req: Request, res: Response) => {
        this.functionService.findAllUsers()
        .then((data: any) => {
            return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))
    };  

    findIdUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.functionService.findIdUser(id)
        .then((data: any) => {
           return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))      
    };  

    createUser = async ( req: Request, res: Response) => {
        const [error, createUsersDto] = CreateUsersDTO.create(req.body)
        
        if(error) return res.status(422).json({ message: error});

        this.functionService.createUser(createUsersDto!)
        .then((data: any) => {
            return res.status(201).json(data);
        })
        .catch((error: unknown) => this.handleError(error, res))  
    };

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateUsersDTO] = UpdateUsersDTO.create(req.body)
        
        if(error) return res.status(422).json({ message: error});
        
        this.functionService.updateUser(id, updateUsersDTO!)
        .then((data) => {
            return res.status(200).json(data)
        })
         .catch((error: unknown) => this.handleError(error,res))  
    };   

    deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

        this.functionService.deleteUser(id)
        .then((data) => {
            return res.status(200).json(null)
        })
         .catch((error: unknown) => this.handleError(error,res)) 
    };      
}

    
          

