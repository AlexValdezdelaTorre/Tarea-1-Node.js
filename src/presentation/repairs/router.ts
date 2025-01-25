import { Router } from "express";
import { RepairService } from "../services/repairsService";
import { RepairsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../../data";
import { UsersService } from "../services/usersService";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";


export class RepairsRoutes {
    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const usersService = new UsersService(emailService);
        const repairService = new RepairService(usersService)
        const repairsController = new RepairsController(repairService);

        router.post('/', repairsController.createService);

        router.use(AuthMiddleware.protec);

        router.get('/', AuthMiddleware.restricTo(Role.EMPLOYEE), repairsController.findAllService);
        router.get('/:id', AuthMiddleware.restricTo(Role.EMPLOYEE), repairsController.findIdService);
        router.patch('/:id', AuthMiddleware.restricTo(Role.EMPLOYEE), repairsController.updateService);
        router.delete('/:id', AuthMiddleware.restricTo(Role.EMPLOYEE), repairsController.deleteService);
        
        

          return router;
    }
}