"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxTopUp = exports.minimumWalletBalance = exports.transferLimit = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const transferLimit = parseInt(process.env.EDEKEE_TRANSFER_LIMIT);
exports.transferLimit = transferLimit;
const minimumWalletBalance = parseInt(process.env.EDEKEE_MINIMUM_WALLET_BALANCE);
exports.minimumWalletBalance = minimumWalletBalance;
const maxTopUp = parseInt(process.env.EDEKEE_MAX_TOPUP);
exports.maxTopUp = maxTopUp;
//# sourceMappingURL=transfer.js.map