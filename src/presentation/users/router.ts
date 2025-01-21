import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/userService";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";



export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const userService = new UserService(emailService)
        const userController = new UserController(userService);

        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findIdUser);
        router.post('/', userController.createUser);
        router.post('/login', userController.loginUser);
        //router.get('/email', userController.findUserByemail);
        router.get('/validate-email/:token', userController.validateAccount);
        router.patch('/:Id', userController.updateUser);
        router.delete('/:id', userController.deleteUser); 
        
        

          return router;
    }
}