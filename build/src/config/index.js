"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxTopUp = exports.minimumWalletBalance = exports.transferLimit = exports.edekeeCommision = exports.vatCharges = exports.paystackConfig = exports.flwConfig = exports.authConfig = exports.isProduction = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const auth_1 = require("./auth");
Object.defineProperty(exports, "authConfig", { enumerable: true, get: function () { return auth_1.authConfig; } });
const charges_1 = require("./charges");
Object.defineProperty(exports, "edekeeCommision", { enumerable: true, get: function () { return charges_1.edekeeCommision; } });
Object.defineProperty(exports, "vatCharges", { enumerable: true, get: function () { return charges_1.vatCharges; } });
const flutterwave_1 = require("./flutterwave");
Object.defineProperty(exports, "flwConfig", { enumerable: true, get: function () { return flutterwave_1.flwConfig; } });
const paystack_1 = require("./paystack");
Object.defineProperty(exports, "paystackConfig", { enumerable: true, get: function () { return paystack_1.paystackConfig; } });
const transfer_1 = require("./transfer");
Object.defineProperty(exports, "minimumWalletBalance", { enumerable: true, get: function () { return transfer_1.minimumWalletBalance; } });
Object.defineProperty(exports, "transferLimit", { enumerable: true, get: function () { return transfer_1.transferLimit; } });
Object.defineProperty(exports, "maxTopUp", { enumerable: true, get: function () { return transfer_1.maxTopUp; } });
const isProduction = process.env.IS_PRODUCTION === "true";
exports.isProduction = isProduction;
//# sourceMappingURL=index.js.map