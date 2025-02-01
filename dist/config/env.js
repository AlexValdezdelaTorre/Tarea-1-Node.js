"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
process.loadEnvFile();
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    DB_USERNAME: (0, env_var_1.get)('USERNAME_DATABASE').required().asString(),
    DB_PASSWORD: (0, env_var_1.get)('PASSWORD_DATABASE').required().asString(),
    DB_HOST: (0, env_var_1.get)('HOST_DATABASE').required().asString(),
    DB_DATABASE: (0, env_var_1.get)('DATABASE').required().asString(),
    DB_PORT: (0, env_var_1.get)('PORT_DATABASE').required().asPortNumber(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
    JWT_EXPIRE_IN: (0, env_var_1.get)("JWT_EXPIRE_IN").required().asString(),
    SEND_EMAIL: (0, env_var_1.get)("SEND_EMAIL").required().asBool(),
    MAILER_SERVICE: (0, env_var_1.get)("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)("MAILER_SECRET_KEY").required().asString(),
    WEBSERVICE_URL: (0, env_var_1.get)("WEBSERVICE_URL").required().asString()
};
