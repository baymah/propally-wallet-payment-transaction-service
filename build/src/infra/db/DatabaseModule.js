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
exports.DatabaseService = exports.readConnection = exports.writeConnection = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const typeorm_1 = require("typeorm");
const configuration_1 = require("../../config/configuration");
const notification_1 = require("./models/notification");
const propertyNotification_1 = require("./models/propertyNotification");
exports.readConnection = {};
class DatabaseService {
    constructor() {
        this.dataSource = new typeorm_1.DataSource({
            type: "postgres",
            host: configuration_1.Config.DATABASE_HOST,
            port: configuration_1.Config.DATABASE_PORT,
            database: configuration_1.Config.DATABASE_NAME,
            username: configuration_1.Config.DATABASE_USER,
            password: configuration_1.Config.DATABASE_PASSWORD,
            synchronize: configuration_1.Config.DATABASE_SYNC,
            logging: configuration_1.Config.DATABASE_LOGGING,
            entities: [notification_1.UserNotification, propertyNotification_1.PropertyInvestmentNotification],
            ssl: true,
            migrations: ["src/lib/infra/db/migrations/*{.js}"],
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataSource.initialize();
            if (!this.dataSource.isInitialized) {
                throw new Error("DataSource is not initialized");
            }
            exports.writeConnection = this.dataSource.createQueryRunner("master");
            exports.readConnection = this.dataSource.manager;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataSource.destroy();
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseModule.js.map