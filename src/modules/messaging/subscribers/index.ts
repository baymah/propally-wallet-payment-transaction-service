import { emailService } from "../services/email"
import { AfterActivityCreated } from "./afterActivityCreated"
import { AfterNotificationCreated } from "./afterNotificationCreated"
import { AfterPropertyInvestmentNotificationCreated } from "./afterPropertyInvestmentNotificationCreated"

new AfterActivityCreated(emailService)
new AfterNotificationCreated(emailService)
new AfterPropertyInvestmentNotificationCreated(emailService)
