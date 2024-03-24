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
exports.AbstractRedisClient = void 0;
class AbstractRedisClient {
    constructor(client) {
        this.tokenExpiryTime = 432000;
        this.client = client;
    }
    count(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const allKeys = yield this.getAllKeys(key);
            return allKeys.length;
        });
    }
    exists(key) {
        return new Promise((resolve, reject) => {
            return this.count(key)
                .then((count) => {
                return resolve(count >= 1 ? true : false);
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
    getOne(key) {
        return this.client.get(key);
    }
    getAllKeys(wildcard) {
        return this.client.keys(wildcard);
    }
    getAllKeyValue(wildcard) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.client.keys(wildcard);
            const allResults = Promise.all(results.map((key) => __awaiter(this, void 0, void 0, function* () {
                const value = yield this.getOne(key);
                return { key, value };
            })));
            return allResults;
        });
    }
    set(key, value) {
        return this.client.set(key, value, { EX: this.tokenExpiryTime });
    }
    setJson(key, value) {
        return this.client.set(key, value, { EX: this.tokenExpiryTime });
    }
    setTokenExpiryTime(time) {
        this.tokenExpiryTime = time;
    }
    deleteOne(key) {
        return this.client.del(key);
    }
    testConnection() {
        return this.client.set("test", "connected");
    }
}
exports.AbstractRedisClient = AbstractRedisClient;
//# sourceMappingURL=abstractRedisClient.js.map