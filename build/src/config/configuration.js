"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const class_validator_1 = require("class-validator");
const dotenv = require("dotenv");
dotenv.config();
class Configuration {
    constructor() {
        this.DATABASE_LOGGING = process.env.DATABASE_LOGGING === "false";
        this.DATABASE_HOST = process.env.DATABASE_HOST;
        this.DATABASE_PORT = Number(process.env.DATABASE_PORT);
        this.DATABASE_NAME = process.env.DATABASE_NAME;
        this.DATABASE_USER = process.env.DATABASE_USER;
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
        this.SLACK_TOKEN = process.env.DATABASE_PASSWORD;
        this.GOOGLE_CLIENT_ID = process.env.DATABASE_PASSWORD;
        this.GOOGLE_CLIENT_SECRET = process.env.DATABASE_PASSWORD;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRATION = +process.env.JWT_EXPIRATION;
        this.DATABASE_SYNC = process.env.DATABASE_SYNC === "true";
        this.PORT = Number(process.env.PORT);
        this.isProduction = process.env.IS_PRODUCTION === "true";
        this.isStaginig = process.env.IS_STAGING === "true";
        const error = (0, class_validator_1.validateSync)(this);
        if (!error.length)
            return;
        console.error(`Config validation error: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_LOGGING", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_HOST", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_NAME", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_USER", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "SLACK_TOKEN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "GOOGLE_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "GOOGLE_CLIENT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], Configuration.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], Configuration.prototype, "JWT_EXPIRATION", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], Configuration.prototype, "DATABASE_SYNC", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], Configuration.prototype, "PORT", void 0);
exports.Config = new Configuration();
//# sourceMappingURL=configuration.js.map