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
exports.CreateNotificationController = void 0;
const BaseController_1 = require("../../../../core/BaseController");
const AppError_1 = require("../../../../core/logic/AppError");
class CreateNotificationController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    executeImpl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = this.req.body;
            try {
                const result = yield this.useCase.execute(dto);
                const resultVal = result.value;
                if (result.isLeft()) {
                    const error = result.value;
                    switch (error.constructor) {
                        case AppError_1.GenericAppError.UnexpectedError:
                            return this.fail(error.errorValue().message);
                        case AppError_1.GenericAppError.InputError:
                            return this.clientError(error.errorValue().message);
                        default:
                            return this.fail(error.errorValue());
                    }
                }
                else {
                    return this.ok(this.res, resultVal.getValue());
                }
            }
            catch (err) {
                this.fail(err);
            }
        });
    }
}
exports.CreateNotificationController = CreateNotificationController;
//# sourceMappingURL=createNotificationController.js.map