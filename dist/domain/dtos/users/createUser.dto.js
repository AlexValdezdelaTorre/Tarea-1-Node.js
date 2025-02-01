"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersDTO = void 0;
const config_1 = require("../../../config");
class CreateUsersDTO {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static create(object) {
        const { name, email, password, role } = object;
        if (!name)
            return ['Missing name'];
        if (!email)
            return ['Missing email'];
        if (!config_1.regularExp.email.test(email))
            return ['Invalid email'];
        if (!password)
            return ["Missing password"];
        if (!config_1.regularExp.password.test(password))
            return ['The password must be at least 10 characters, and contain at least one uppercase letter, one lowercase and one especial character'];
        if (!role)
            return ['Missing rol'];
        return [undefined, new CreateUsersDTO(name, email, password, role)];
    }
}
exports.CreateUsersDTO = CreateUsersDTO;
