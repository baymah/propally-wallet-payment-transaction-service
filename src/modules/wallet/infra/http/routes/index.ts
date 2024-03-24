import express from "express"
import { createActivityController } from "../../../usecases/createActivity"
import { getUserActivityController } from "../../../usecases/getUserActivity"
const activitiesRouter = express.Router()

//#endregion
//#region Activities routes;
activitiesRouter.get("/", (req: any, res: any) => {
  getUserActivityController.execute(req, res, () => getUserActivityController.executeImpl(req, res))
})

activitiesRouter.post("/", (req: any, res: any) => {
  createActivityController.execute(req, res, () => createActivityController.executeImpl(req, res))
})

//#endregion

export { activitiesRouter }
