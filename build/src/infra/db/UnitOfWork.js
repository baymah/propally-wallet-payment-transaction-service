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
exports.UnitOfWork = void 0;
const DatabaseModule_1 = require("./DatabaseModule");
class UnitOfWork {
    startTransaction(level) {
        return __awaiter(this, void 0, void 0, function* () {
            level ? yield DatabaseModule_1.writeConnection.startTransaction(level) : yield DatabaseModule_1.writeConnection.startTransaction();
        });
    }
    commitTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseModule_1.writeConnection.commitTransaction();
        });
    }
    rollbackTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseModule_1.writeConnection.rollbackTransaction();
        });
    }
    complete(work) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield work();
                yield this.commitTransaction();
            }
            catch (error) {
                yield this.rollbackTransaction();
                throw error;
            }
            finally {
                // await writeConnection.release()
            }
        });
    }
}
exports.UnitOfWork = UnitOfWork;
//# sourceMappingURL=UnitOfWork.js.map