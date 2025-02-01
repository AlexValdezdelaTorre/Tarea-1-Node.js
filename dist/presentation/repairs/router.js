"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairsRoutes = void 0;
const express_1 = require("express");
const repairsService_1 = require("../services/repairsService");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const data_1 = require("../../data");
const usersService_1 = require("../services/usersService");
const email_service_1 = require("../services/email.service");
const config_1 = require("../../config");
class RepairsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const usersService = new usersService_1.UsersService(emailService);
        const repairService = new repairsService_1.RepairService(usersService);
        const repairsController = new controller_1.RepairsController(repairService);
        router.post('/', repairsController.createService);
        router.use(auth_middleware_1.AuthMiddleware.protec);
        router.get('/', auth_middleware_1.AuthMiddleware.restricTo(data_1.Role.EMPLOYEE), repairsController.findAllService);
        router.get('/:id', auth_middleware_1.AuthMiddleware.restricTo(data_1.Role.EMPLOYEE), repairsController.findIdService);
        router.patch('/:id', auth_middleware_1.AuthMiddleware.restricTo(data_1.Role.EMPLOYEE), repairsController.updateService);
        router.delete('/:id', auth_middleware_1.AuthMiddleware.restricTo(data_1.Role.EMPLOYEE), repairsController.deleteService);
        return router;
    }
}
exports.RepairsRoutes = RepairsRoutes;
