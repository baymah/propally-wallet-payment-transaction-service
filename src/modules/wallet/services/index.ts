import { redisConnection } from "../../../infra/redis/redisConnection"
import { RedisNotificationService } from "./redis/redisNotificationService"
const redisNotificationService = new RedisNotificationService(redisConnection)
// const paymentService = new PaymentService(redisPaymentService)
export { redisNotificationService }
