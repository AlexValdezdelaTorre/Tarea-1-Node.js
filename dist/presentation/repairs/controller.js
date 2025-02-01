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
exports.RepairsController = void 0;
const domain_1 = require("../../domain");
class RepairsController {
    constructor(repairService) {
        this.repairService = repairService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            ;
            console.log(error);
            return res.status(500).json({ message: "Internal served error 💩" });
        };
        this.findAllService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.repairService.findAllService()
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.findIdService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.repairService.findIdService(id)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.createService = (req, res) => {
            const [error, createServiceDto] = domain_1.CreateServicesDTO.create(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.repairService.createService(createServiceDto)
                .then((data) => {
                return res.status(201).json(data);
            })
                .catch((error) => this.handleError(error, res));
        };
        this.updateService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            this.repairService.updateService(id)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        });
        this.deleteService = (req, res) => {
            const { id } = req.params;
            this.repairService.deleteService(id)
                .then((data) => {
                return res.status(200).json(data);
            })
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.RepairsController = RepairsController;
