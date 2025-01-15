import { Router } from "express";
import { UserController } from "./controller";
import { PostService } from "../services/post.service";


export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const postService = new PostService()
        const userController = new UserController(postService);

        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findIdUser);
        router.post('/', userController.createUser);
        router.patch('/:Id', userController.updateUser);
        router.delete('/:id', userController.deleteUser);
        
        

          return router;
    }
}