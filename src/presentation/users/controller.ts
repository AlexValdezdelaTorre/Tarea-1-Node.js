import { Request, Response } from "express"
import { PostService } from "../services/post.service";
//import { CreateUsersDTO } from "../../domain";


export class UserController {

    constructor(private readonly postService: PostService){}

    findAllUsers = async (req: Request, res: Response) => {
        this.postService.findAllUsers()
        .then((data: any) => {
            return res.status(200).json(data)
        })
        .catch((error: any) => {
            return res.status(500).json({
                message: "Internal Server Error",
                error,      
            });
        }) ;  
    };  

    findIdUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        this.postService.findIdUser(id)
        .then((data: any) => {
           return res.status(200).json(data)
        })
        .catch((error: any) => {
            return res.status(500).json({
                     message: "Internal Server Error",
                     error,           
            });
        });  
    };  

    createUser = async ( req: Request, res: Response) => {
        //const [error, createUsersDto] = CreateUsersDTO.create(req.body)
        
        //if(error) return res.status(422).json({ message: error});

        this.postService.createUser(req.body)
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

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        this.postService.updateUser(id, req.body)
        .then((data) => {
            return res.status(200).json(data)
        })
         .catch((error) => {
            return res.status(500).json({
                message: "Internal Server Error",
                error,
            });
         });  
        };   

deleteUser = (req: Request, res: Response) => {
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

    
          

