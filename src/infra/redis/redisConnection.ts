import * as redis from "redis"
import { RedisClientType } from "redis"
import { authConfig, isProduction } from "../../config"

const port = authConfig.redisServerPort
const host = authConfig.redisServerURL
const redisConnection: RedisClientType = isProduction ? redis.createClient({ url: authConfig.redisConnectionString }) : redis.createClient({ url: authConfig.redisConnectionString }) // creates a new client

redisConnection.on("error", (err) => console.log("Redis Client Error", err))

redisConnection
  .connect()
  .then(() => {
    console.log("Redis Client")
  })
  .catch((err) => {
    console.log("Redis Client Error", err)
  })
redisConnection.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`)
})

export { redisConnection }
