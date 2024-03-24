// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
const transferLimit = parseInt(process.env.EDEKEE_TRANSFER_LIMIT)
const minimumWalletBalance = parseInt(process.env.EDEKEE_MINIMUM_WALLET_BALANCE)
const maxTopUp = parseInt(process.env.EDEKEE_MAX_TOPUP)

export { transferLimit, minimumWalletBalance, maxTopUp }
