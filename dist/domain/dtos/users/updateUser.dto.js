"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsersDTO = void 0;
const config_1 = require("../../../config");
class UpdateUsersDTO {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    static create(object) {
        const { name, email } = object;
        if (!name)
            return ['Missing name', undefined];
        if (typeof name !== 'string')
            ["The name must be a string"];
        if (!email)
            return ['Missing email'];
        if (!config_1.regularExp.email.test(email))
            return ["Invalid email"];
        return [undefined, new UpdateUsersDTO(name, email)];
    }
}
exports.UpdateUsersDTO = UpdateUsersDTO;
