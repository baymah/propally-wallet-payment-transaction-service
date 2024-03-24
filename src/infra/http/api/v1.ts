import express from "express"
import { notificationRouter, propertyInvestmentRouter } from "../../../modules/payment/infra/http/routes"
import { activitiesRouter } from "../../../modules/wallet/infra/http/routes"

const v1Router = express.Router()

v1Router.get("/", (req, res) => {
  return res.json({ message: "Yo! we're up" })
})

v1Router.use("/notifications", notificationRouter)
v1Router.use("/activities", activitiesRouter)
v1Router.use("/property-investment-notifications", propertyInvestmentRouter)

export { v1Router }
