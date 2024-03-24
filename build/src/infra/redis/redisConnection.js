"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const redis = __importStar(require("redis"));
const config_1 = require("../../config");
const port = config_1.authConfig.redisServerPort;
const host = config_1.authConfig.redisServerURL;
const redisConnection = config_1.isProduction ? redis.createClient({ url: config_1.authConfig.redisConnectionString }) : redis.createClient({ url: config_1.authConfig.redisConnectionString }); // creates a new client
exports.redisConnection = redisConnection;
redisConnection.on("error", (err) => console.log("Redis Client Error", err));
redisConnection
    .connect()
    .then(() => {
    console.log("Redis Client");
})
    .catch((err) => {
    console.log("Redis Client Error", err);
});
redisConnection.on("connect", () => {
    console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
});
//# sourceMappingURL=redisConnection.js.map