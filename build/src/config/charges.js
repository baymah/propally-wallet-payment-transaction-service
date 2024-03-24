"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edekeeCommision = exports.vatCharges = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const vatCharges = parseInt(process.env.EDEKEE_VAT);
exports.vatCharges = vatCharges;
const edekeeCommision = parseInt(process.env.EDEKEE_COMMISSION_PERCENTAGE);
exports.edekeeCommision = edekeeCommision;
//# sourceMappingURL=charges.js.map