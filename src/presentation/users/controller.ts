import { Request, Response } from "express"
import { CustomError, UpdateUsersDTO, CreateUsersDTO, LoginUserDTO } from "../../domain";
import { UsersService } from "../services/usersService";

export class UserController {
    constructor(private readonly userService: UsersService){}
    
    private handleError = (error: unknown, res: Response) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message});

      };
      console.log(error);
      return res.status(500).json({ message: "Internal served error 💩"})
    }

    findAllUsers = async (req: Request, res: Response) => {
        this.userService.findAllUsers()
        .then((data: any) => {
            return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))
    };  

    findIdUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.userService.findIdUser(id)
        .then((data: any) => {
           return res.status(200).json(data)
        })
        .catch((error: unknown) => this.handleError(error,res))      
    };  

    loginUser = ( req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDTO.create(req.body)
        
        if(error) return res.status(422).json({ message: error});

        this.userService.loginUser(loginUserDto!)
          .then((data) => 
          res.status(201).json(data))
          .catch((error: unknown) => this.handleError(error, res))  
    };

    createUser =  ( req: Request, res: Response) => {
        const [error, createUsersDto] = CreateUsersDTO.create(req.body)
        
        if(error) return res.status(422).json({ message: error});

        this.userService.createUser(createUsersDto!)
        .then((data: any) => 
            res.status(201).json(data)
        )
        .catch((error: unknown) => this.handleError(error, res))  
    };

    validateAccount = (req: Request, res: Response) => {
        const { token } = req.params;

        this.userService
           .validateEmail(token)
           .then((data: any) => res.status(200).json(data))
           .catch((error: any) => this.handleError(error, res))
    }

    
    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateUsersDTO] = UpdateUsersDTO.create(req.body)
        
        if(error) return res.status(422).json({ message: error});
        
        this.userService.updateUser(id, updateUsersDTO!)
        .then((data: any) => {
            return res.status(200).json(data)
        })
         .catch((error: unknown) => this.handleError(error,res))  
    };   
 
      

    deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

        this.userService.deleteUser(id)
        .then((data: any) => {
            return res.status(200).json(data)
        })
         .catch((error: unknown) => this.handleError(error,res)) 
    };     

}
