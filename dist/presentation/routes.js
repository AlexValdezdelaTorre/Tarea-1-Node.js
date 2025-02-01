"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const router_1 = require("./users/router");
const router_2 = require("./repairs/router");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/users', router_1.UserRoutes.routes);
        router.use('/api/repairs', router_2.RepairsRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
