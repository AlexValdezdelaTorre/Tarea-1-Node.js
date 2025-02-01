"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            ;
            console.log(error);
            return res.status(500).json({ message: "Internal served error 💩" });
        };
        this.findAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.userService.findAllUsers()
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.findIdUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.userService.findIdUser(id)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.userService.loginUser(loginUserDto)
                .then((data) => res.status(201).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.createUser = (req, res) => {
            const [error, createUsersDto] = domain_1.CreateUsersDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.userService.createUser(createUsersDto)
                .then((data) => res.status(201).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.validateAccount = (req, res) => {
            const { token } = req.params;
            this.userService
                .validateEmail(token)
                .then((data) => res.status(200).json(data))
                .catch((error) => this.handleError(error, res));
        };
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUser.id;
            if (!id) {
                return res.status(400).json({ message: "ID del usuario es requerido" });
            }
            const [error, updateUsersDTO] = domain_1.UpdateUsersDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.userService.updateUser(id, updateUsersDTO, sessionUserId)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.deleteUser = (req, res) => {
            const { id } = req.params;
            const sessionUserId = req.body.sessionUser.id;
            this.userService.deleteUser(id, sessionUserId)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;
