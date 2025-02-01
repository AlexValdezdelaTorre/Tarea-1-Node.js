"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const usersService_1 = require("../services/usersService");
const email_service_1 = require("../services/email.service");
const config_1 = require("../../config");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const usersService = new usersService_1.UsersService(emailService);
        const userController = new controller_1.UserController(usersService);
        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findIdUser);
        router.post('/', userController.createUser);
        router.post('/login', userController.loginUser);
        router.get('/validate-email/:token', userController.validateAccount);
        router.use(auth_middleware_1.AuthMiddleware.protec);
        router.patch('/:id', userController.updateUser);
        router.delete('/:id', userController.deleteUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
