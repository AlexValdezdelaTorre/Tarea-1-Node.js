import { Router } from "express";
import { UserRoutes } from "./users/router";

export class AppRoutes {
    
    static get routes(): Router {
        const router = Router();

        router.use('/api/users', UserRoutes.routes);
        router.use('/api/repairs', UserRoutes.routes);

        return router;
    }
}

