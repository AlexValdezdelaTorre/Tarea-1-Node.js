import { Router } from "express";
import { UserController } from "./controller";
import { FunctionService } from "../services/functionService";


export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const functionService = new FunctionService()
        const userController = new UserController(functionService);

        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findIdUser);
        router.post('/', userController.createUser);
        router.patch('/:Id', userController.updateUser);
        router.delete('/:id', userController.deleteUser);
        
        

          return router;
    }
}