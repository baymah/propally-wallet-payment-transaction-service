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
exports.BaseController = void 0;
class BaseController {
    constructor() {
        this.execute = (req, res, controllerFunction) => __awaiter(this, void 0, void 0, function* () {
            this.req = req;
            this.res = res;
            controllerFunction();
        });
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ status: false, message, data: null });
    }
    ok(res, dto) {
        if (dto) {
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    created(res, dto) {
        if (dto) {
            return res.status(201).json(dto);
        }
        return res.sendStatus(201);
    }
    clientError(message) {
        return BaseController.jsonResponse(this.res, 400, message ? message : "Invalid Request");
    }
    unauthorized(message) {
        return BaseController.jsonResponse(this.res, 401, message ? message : "Unauthorized");
    }
    paymentRequired(message) {
        return BaseController.jsonResponse(this.res, 402, message ? message : "Payment required");
    }
    forbidden(message) {
        return BaseController.jsonResponse(this.res, 403, message ? message : "Forbidden");
    }
    notFound(message) {
        return BaseController.jsonResponse(this.res, 404, message ? message : "Not found");
    }
    conflict(message) {
        return BaseController.jsonResponse(this.res, 409, message ? message : "Conflict");
    }
    tooMany(message) {
        return BaseController.jsonResponse(this.res, 429, message ? message : "Too many requests");
    }
    todo() {
        return BaseController.jsonResponse(this.res, 400, "TODO");
    }
    fail(error) {
        return this.res.status(500).json({
            message: error.toString(),
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map