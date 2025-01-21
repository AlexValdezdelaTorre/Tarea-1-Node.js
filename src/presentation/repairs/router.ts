import { Router } from "express";
import { RepairService } from "../services/repairsService";
import { RepairsController } from "./controller";


export class RepairsRoutes {
    static get routes(): Router {
        const router = Router();

        const repairService = new RepairService()
        const repairsController = new RepairsController(repairService);

        router.get('/', repairsController.findAllService);
        router.get('/:id', repairsController.findIdService);
        router.post('/', repairsController.createService);
        router.patch('/:id', repairsController.updateService);
        router.delete('/:id', repairsController.deleteService);
        
        

          return router;
    }
}