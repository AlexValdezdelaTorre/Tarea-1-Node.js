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
exports.UsersService = void 0;
const config_1 = require("../../config");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const validate_owner_1 = require("../../config/validate-owner");
const users_model_1 = require("../../data/postgres/models/users.model");
const domain_1 = require("../../domain");
class UsersService {
    constructor(emailService) {
        this.emailService = emailService;
        this.sendEmailValidationLink = (email) => __awaiter(this, void 0, void 0, function* () {
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ email }, '300s');
            const link = `http://${config_1.envs.WEBSERVICE_URL}/api/users/validate-email/${token}`;
            const html = `
      <h1>Validate your email</h1>
      <p>click on the following link to validate your email<p>
      <a href="${link}">Validate your email: ${email}</a>
      `;
            const isSent = this.emailService.sendEmail({
                to: email,
                subject: "Validate your account",
                htmlBody: html
            });
            if (!isSent)
                throw domain_1.CustomError.internalServed("Error sending email");
            return true;
        });
        this.validateEmail = (token) => __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.badRequest("Invalid token");
            const { email } = payload;
            if (!email)
                throw domain_1.CustomError.internalServed("Email not in token");
            const user = yield users_model_1.Users.findOne({ where: { email: email } });
            if (!user)
                throw domain_1.CustomError.internalServed("Email  not exist");
            user.status = users_model_1.Status.AVAILABLE;
            try {
                yield user.save();
                return {
                    message: "User active"
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Something went wery wrong");
            }
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield users_model_1.Users.find({
                    where: {
                        status: users_model_1.Status.AVAILABLE,
                    }
                });
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error obteniendo datos");
            }
        });
    }
    findIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_model_1.Users.createQueryBuilder("user")
                .where("user.id = :id", { id: id })
                .andWhere("user.status = :status", { status: users_model_1.Status.AVAILABLE })
                .getOne();
            if (!result) {
                throw domain_1.CustomError.notFound("User not found");
            }
            return result;
        });
    }
    //const query = `SELECT * FROM "users" WHERE "id" = $1`;
    //const result = await Users.query(query, [id]);
    loginUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(credentials.email);
            const isMatching = config_1.encriptAdapter.compare(credentials.password, user.password);
            if (!isMatching)
                throw domain_1.CustomError.unAuthorized('Invalid Credentials');
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ id: user.id });
            if (!token)
                throw domain_1.CustomError.internalServed("Error while creating JWT");
            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            };
        });
    }
    ;
    createUser(usersData) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = new users_model_1.Users();
            users.name = usersData.name;
            users.email = usersData.email;
            users.password = usersData.password;
            users.role = usersData.role;
            try {
                const dbUser = yield users.save();
                yield this.sendEmailValidationLink(dbUser.email);
                return {
                    id: dbUser.id,
                    name: dbUser.name,
                    email: dbUser.email,
                    role: dbUser.role,
                    status: dbUser.status
                };
            }
            catch (error) {
                if (error.code === '23505') {
                    throw domain_1.CustomError.badRequest(`User with: ${usersData.email} email already exist`);
                }
                throw domain_1.CustomError.internalServed("Error creando el usuario");
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.Users.findOne({
                where: {
                    email: email,
                    status: users_model_1.Status.AVAILABLE,
                }
            });
            if (!user)
                throw domain_1.CustomError.notFound(`User with email: ${email} not found`);
            return user;
        });
    }
    updateUser(id, usersData, sessionUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findIdUser(id);
            const isOwner = (0, validate_owner_1.protecAccountOwner)(user.id, sessionUserId);
            if (!isOwner)
                throw domain_1.CustomError.unAuthorized("You are not the owner of this account");
            user.name = usersData.name.trim();
            user.email = usersData.email.toLowerCase().trim();
            try {
                const dbUser = yield user.save();
                return {
                    name: dbUser.name,
                    email: dbUser.email,
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error actualizando el usuario");
            }
        });
    }
    deleteUser(id, sessionUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.findIdUser(id);
            const isOwner = (0, validate_owner_1.protecAccountOwner)(userId.id, sessionUserId);
            if (!isOwner)
                throw domain_1.CustomError.unAuthorized("You are not the owner of this account");
            userId.status = users_model_1.Status.DISABLED;
            try {
                userId.save();
                return {
                    id: userId.id,
                    status: userId.status
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error eliminando el usuario");
            }
        });
    }
}
exports.UsersService = UsersService;
