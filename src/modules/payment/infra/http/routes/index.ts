import express from "express"
import { createNotificationController } from "../../../usecase/createNotification"
import { getNotificationController } from "../../../usecase/getNotifications"
import { getUserNotificationController } from "../../../usecase/getUserNotifications"
import { createPropertyInvestmentNotificationController } from "../../../usecase/createPropertyInvestmentNotification"
import { getUserPropertyInvestmentNotificationController } from "../../../usecase/getUserPropertyInvestmentNotification"

const notificationRouter = express.Router()
const propertyInvestmentRouter = express.Router()

//#region Notifications routes

notificationRouter.post("/", (req: any, res: any) => {
  createNotificationController.execute(req, res, () => createNotificationController.executeImpl(req, res))
})

notificationRouter.get("/", (req: any, res: any) => {
  getNotificationController.execute(req, res, () => getNotificationController.executeImpl(req, res))
})

notificationRouter.get("/user-notifications", (req: any, res: any) => {
  getUserNotificationController.execute(req, res, () => getUserNotificationController.executeImpl(req, res))
})

//#endregion

//#region Property Investment routes;

propertyInvestmentRouter.get("/", (req: any, res: any) => {
  getUserPropertyInvestmentNotificationController.execute(req, res, () => getUserPropertyInvestmentNotificationController.executeImpl(req, res))
})

propertyInvestmentRouter.post("/", (req: any, res: any) => {
  createPropertyInvestmentNotificationController.execute(req, res, () => createPropertyInvestmentNotificationController.executeImpl(req, res))
})

//#endregion

export { notificationRouter, propertyInvestmentRouter }
