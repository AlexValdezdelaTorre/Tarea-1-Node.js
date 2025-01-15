import { Router } from "express";
import { FunctionService } from "../services/functionService";
import { RepairsController } from "./controller";


export class RepairsRoutes {
    static get routes(): Router {
        const router = Router();

        const functionService = new FunctionService()
        const repairsController = new RepairsController(functionService);

        router.get('/', repairsController.findAllService);
        router.get('/:id', repairsController.findIdService);
        router.post('/', repairsController.createService);
        router.patch('/:id', repairsController.updateService);
        router.delete('/:id', repairsController.deleteService);
        
        

          return router;
    }
}