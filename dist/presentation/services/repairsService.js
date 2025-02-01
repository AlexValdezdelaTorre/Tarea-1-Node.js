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
exports.RepairService = void 0;
const repairs_model_1 = require("../../data/postgres/models/repairs.model");
const domain_1 = require("../../domain");
const typeorm_1 = require("typeorm");
class RepairService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repairs_model_1.Repairs.find({
                    where: {
                        repairStatus: (0, typeorm_1.In)([repairs_model_1.RepairStatus.PENDING, repairs_model_1.RepairStatus.COMPLETED])
                    },
                    relations: ['user'],
                    select: {
                        user: {
                            name: true,
                            email: true,
                            role: true,
                            id: true,
                            status: true
                        }
                    }
                });
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error obteniendo datos");
            }
        });
    }
    findIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repair = yield repairs_model_1.Repairs.findOne({
                where: {
                    id,
                    repairStatus: repairs_model_1.RepairStatus.PENDING
                },
            });
            if (!repair) {
                throw domain_1.CustomError.notFound("User not found");
            }
            return repair;
        });
    }
    createService(repairsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const repairs = new repairs_model_1.Repairs();
            const user = yield this.usersService.findIdUser(repairsData.userId);
            repairs.date = repairsData.date;
            repairs.motorsNumber = repairsData.motorsNumber;
            repairs.description = repairsData.description;
            repairs.user = user;
            try {
                return yield repairs.save();
            }
            catch (error) {
                throw new Error("Error generando la cita");
            }
        });
    }
    updateService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.findIdService(id);
            service.repairStatus = repairs_model_1.RepairStatus.COMPLETED;
            try {
                yield service.save();
                return {
                    message: "Repair completed",
                    motorsNumber: service.motorsNumber,
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error actualizando el usuario");
            }
        });
    }
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.findIdService(id);
            service.repairStatus = repairs_model_1.RepairStatus.CANCELLED;
            try {
                yield service.save();
                return {
                    message: "Reparación cancelada",
                    motorsNumber: service.motorsNumber
                };
            }
            catch (error) {
                throw domain_1.CustomError.internalServed("Error eliminando el usuario");
            }
        });
    }
}
exports.RepairService = RepairService;
