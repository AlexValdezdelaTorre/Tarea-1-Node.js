"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicesDTO = void 0;
const config_1 = require("../../../config");
class CreateServicesDTO {
    constructor(date, motorsNumber, description, userId) {
        this.date = date;
        this.motorsNumber = motorsNumber;
        this.description = description;
        this.userId = userId;
    }
    static create(object) {
        const { date, motorsNumber, description, userId } = object;
        if (!userId)
            return ['Missing Id', undefined];
        if (!userId || typeof userId !== 'string' || !config_1.regularExp.uuid.test(userId)) {
            return ['Invalid userId format, must be a UUID'];
        }
        if (!motorsNumber)
            return ['Missing motor number', undefined];
        if (!description)
            return ['You have to include a description of reparation service', undefined];
        return [undefined, new CreateServicesDTO(date, motorsNumber, description, userId)];
    }
}
exports.CreateServicesDTO = CreateServicesDTO;
