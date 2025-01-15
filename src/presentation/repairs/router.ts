import { Router } from "express";
import { PostService } from "../services/service";
import { RepairsController } from "./controller";


export class RepairsRoutes {
    static get routes(): Router {
        const router = Router();

        const postService = new PostService()
        const repairsController = new RepairsController(postService);

        router.get('/', repairsController.findAllService);
        router.get('/:id', repairsController.findIdService);
        router.post('/', repairsController.createService);
        router.patch('/:id', repairsController.updateService);
        router.delete('/:id', repairsController.deleteService);
        
        

          return router;
    }
}