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
exports.PostgresDatabase = void 0;
const typeorm_1 = require("typeorm");
const users_model_1 = require("./models/users.model");
const repairs_model_1 = require("./models/repairs.model");
class PostgresDatabase {
    constructor(options) {
        this.datasource = new typeorm_1.DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [users_model_1.Users, repairs_model_1.Repairs],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.datasource.initialize();
                console.log('database conected 👌');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.PostgresDatabase = PostgresDatabase;
