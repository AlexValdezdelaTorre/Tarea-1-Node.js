"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicesDTO = void 0;
class UpdateServicesDTO {
    constructor(id) {
        this.id = id;
    }
    static create(object) {
        const { id } = object;
        if (!id)
            return ['Service not found', undefined];
        return [undefined, new UpdateServicesDTO(id)];
    }
}
exports.UpdateServicesDTO = UpdateServicesDTO;
