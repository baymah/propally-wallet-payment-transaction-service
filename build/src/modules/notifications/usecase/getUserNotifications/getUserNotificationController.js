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
exports.GetUserNotificationController = void 0;
const BaseController_1 = require("../../../../core/BaseController");
const AppError_1 = require("../../../../core/logic/AppError");
class GetUserNotificationController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    executeImpl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dto = {};
            dto.userId = req.query.userId;
            dto.page = req.query.page || 1;
            dto.perPage = req.query.perPage || 10;
            try {
                const result = yield this.useCase.execute(dto);
                const resultVal = result.value;
                if (result.isLeft()) {
                    const error = result.value;
                    switch (error.constructor) {
                        case AppError_1.GenericAppError.UnexpectedError:
                            return this.conflict(error.errorValue().message);
                        default:
                            return this.fail(error.errorValue());
                    }
                }
                else {
                    return this.ok(this.res, { status: true, message: "User notifications", data: resultVal.getValue() });
                }
            }
            catch (err) {
                this.fail(err);
            }
        });
    }
}
exports.GetUserNotificationController = GetUserNotificationController;
//# sourceMappingURL=getUserNotificationController.js.map