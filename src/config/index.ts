// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
import { authConfig } from "./auth"
import { edekeeCommision, vatCharges } from "./charges"
import { flwConfig } from "./flutterwave"
import { paystackConfig } from "./paystack"

import { minimumWalletBalance, transferLimit, maxTopUp } from "./transfer"

const isProduction = process.env.IS_PRODUCTION === "true"

export { isProduction, authConfig, flwConfig, paystackConfig, vatCharges, edekeeCommision, transferLimit, minimumWalletBalance, maxTopUp }
