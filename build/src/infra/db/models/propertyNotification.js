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
exports.PropertyInvestmentNotification = exports.PropertyInvestmentNotificationType = void 0;
// Enum defining different types of notifications
var PropertyInvestmentNotificationType;
(function (PropertyInvestmentNotificationType) {
    PropertyInvestmentNotificationType["NewMessage"] = "new_message";
    PropertyInvestmentNotificationType["PriceChange"] = "price_change";
    PropertyInvestmentNotificationType["NewInvestment"] = "new_investment";
    // Add more types as needed
})(PropertyInvestmentNotificationType = exports.PropertyInvestmentNotificationType || (exports.PropertyInvestmentNotificationType = {}));
const typeorm_1 = require("typeorm");
let PropertyInvestmentNotification = class PropertyInvestmentNotification extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PropertyInvestmentNotificationType,
    }),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PropertyInvestmentNotification.prototype, "property_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], PropertyInvestmentNotification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], PropertyInvestmentNotification.prototype, "updatedAt", void 0);
PropertyInvestmentNotification = __decorate([
    (0, typeorm_1.Entity)("property_investment_notifications")
], PropertyInvestmentNotification);
exports.PropertyInvestmentNotification = PropertyInvestmentNotification;
//# sourceMappingURL=propertyNotification.js.map