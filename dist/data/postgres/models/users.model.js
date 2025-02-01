"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.Status = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const repairs_model_1 = require("./repairs.model");
var Role;
(function (Role) {
    Role["EMPLOYEE"] = "EMPLOYEE";
    Role["CLIENT"] = "CLIENT";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["AVAILABLE"] = "AVAILABLE";
    Status["DISABLED"] = "DISABLED";
})(Status || (exports.Status = Status = {}));
let Users = class Users extends typeorm_1.BaseEntity {
    encryptedPassword() {
        this.password = config_1.encriptAdapter.hash(this.password);
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        nullable: false,
        length: 255,
        unique: true,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        nullable: false
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: Role,
        default: Role.EMPLOYEE
    }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: Status,
        default: Status.AVAILABLE
    }),
    __metadata("design:type", String)
], Users.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => repairs_model_1.Repairs, (repairs) => repairs.user),
    __metadata("design:type", Array)
], Users.prototype, "repairs", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Users.prototype, "encryptedPassword", null);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
