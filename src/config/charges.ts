// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
const vatCharges = parseInt(process.env.EDEKEE_VAT)
const edekeeCommision = parseInt(process.env.EDEKEE_COMMISSION_PERCENTAGE)

export { vatCharges, edekeeCommision }
