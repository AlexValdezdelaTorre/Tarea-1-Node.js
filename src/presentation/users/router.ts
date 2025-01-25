import { Router } from "express";
import { UserController } from "./controller";
import { UsersService } from "../services/usersService";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../../data";




export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const usersService = new UsersService(emailService)
        const userController = new UserController(usersService);

        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findIdUser);
        router.post('/', userController.createUser);
        router.post('/login', userController.loginUser);
        router.get('/validate-email/:token', userController.validateAccount);
        
        router.use(AuthMiddleware.protec);
        
        router.patch('/:Id', AuthMiddleware.restricTo(Role.CLIENT), userController.updateUser);
        router.delete('/:id', AuthMiddleware.restricTo(Role.CLIENT), userController.deleteUser); 

        
       
        

     return router;
    }
}