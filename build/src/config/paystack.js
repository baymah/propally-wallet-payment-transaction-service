"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paystackConfig = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const isProduction = process.env.IS_PRODUCTION === "true";
const paystackConfig = {
    publicKey: isProduction ? process.env.PAYSTACK_PUBLIC_KEY : process.env.TEST_PAYSTACK_PUBLIC_KEY,
    secretKey: isProduction ? process.env.PAYSTACK_SECRET_KEY : process.env.TEST_PAYSTACK_SECRET_KEY,
};
exports.paystackConfig = paystackConfig;
//# sourceMappingURL=paystack.js.map