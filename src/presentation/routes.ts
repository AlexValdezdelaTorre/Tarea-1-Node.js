import { Router } from "express";
import { UserRoutes } from "./users/router";
import { RepairsRoutes } from "./repairs/router";

export class AppRoutes {
    
    static get routes(): Router {
        const router = Router();

        router.use('/api/users', UserRoutes.routes);
        router.use('/api/repairs', RepairsRoutes.routes);

        return router;
    }
}

