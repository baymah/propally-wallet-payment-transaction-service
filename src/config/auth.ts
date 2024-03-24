// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()
const authConfig = {
  secret: process.env.JWT_SECRET || "edekeeTech2020",
  tokenExpiryTime: 300000, // seconds
  redisServerPort: process.env.REDIS_PORT || 6379,
  redisServerURL: process.env.REDIS_URL,
  redisConnectionString: process.env.REDIS_CONNECTION_STRING,
}

export { authConfig }
