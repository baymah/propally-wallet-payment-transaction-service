"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const authConfig = {
    secret: process.env.JWT_SECRET || "edekeeTech2020",
    tokenExpiryTime: 300000,
    redisServerPort: process.env.REDIS_PORT || 6379,
    redisServerURL: process.env.REDIS_URL,
    redisConnectionString: process.env.REDIS_CONNECTION_STRING,
};
exports.authConfig = authConfig;
//# sourceMappingURL=auth.js.map