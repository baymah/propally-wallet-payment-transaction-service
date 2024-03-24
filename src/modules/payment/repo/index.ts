import { PropertyEntity } from "../../../infra/db/models/Property"
import { UserEntity } from "../../../infra/db/models/UserEntity"
import { UserNotification } from "../../../infra/db/models/notification"
import { PropertyInvestmentNotificationEntity } from "../../../infra/db/models/propertyNotification"
import { NotificationRepo } from "./NotificationRepo"
import { PropertyInvestmentNotificationRepo } from "./PropertyInvestmentNotificationRepo"
import { PropertyRepo } from "./PropertyRepo"
import { UserRepo } from "./UserRepo"

const notificationRepo = new NotificationRepo(UserNotification)
const propertyInvestmentRepo = new PropertyInvestmentNotificationRepo(PropertyInvestmentNotificationEntity)
const userRepo = new UserRepo(UserEntity)
const propertyRepo = new PropertyRepo(PropertyEntity)

export { notificationRepo, propertyInvestmentRepo, userRepo, propertyRepo }
