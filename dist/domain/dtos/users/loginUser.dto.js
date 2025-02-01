"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDTO = void 0;
const config_1 = require("../../../config");
class LoginUserDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { email, password } = object;
        if (!email)
            return ['Missing name' /*undefined*/];
        if (!config_1.regularExp.email.test(email))
            return ['Invalid email'];
        if (!password)
            return ["Missing password"];
        if (!config_1.regularExp.password.test(password))
            return ['The password must be at least 10 characters, and contain at least one uppercase letter, one lowercase and one especial character'];
        return [undefined, new LoginUserDTO(email, password)];
    }
}
exports.LoginUserDTO = LoginUserDTO;
