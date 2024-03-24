"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flwConfig = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const isProduction = process.env.IS_PRODUCTION === "true";
const flwConfig = {
    publicKey: isProduction ? process.env.FLUTTERWAVE_PUBLIC_KEY : process.env.TEST_FLUTTERWAVE_PUBLIC_KEY,
    secretKey: isProduction ? process.env.FLUTTERWAVE_SECRET_KEY : process.env.TEST_FLUTTERWAVE_SECRET_KEY,
};
exports.flwConfig = flwConfig;
//# sourceMappingURL=flutterwave.js.map