import { RedisClientType } from "redis"

export abstract class AbstractRedisClient {
  private tokenExpiryTime = 432000
  protected client: RedisClientType

  constructor(client: RedisClientType) {
    this.client = client
  }

  public async count(key: string): Promise<number> {
    const allKeys = await this.getAllKeys(key)
    return allKeys.length
  }

  public exists(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this.count(key)
        .then((count) => {
          return resolve(count >= 1 ? true : false)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }

  public getOne<T>(key: string): Promise<T | string> {
    return this.client.get(key)
  }

  public getAllKeys(wildcard: string): Promise<string[]> {
    return this.client.keys(wildcard)
  }

  public async getAllKeyValue(wildcard: string): Promise<any[]> {
    const results = await this.client.keys(wildcard)
    const allResults = Promise.all(
      results.map(async (key) => {
        const value = await this.getOne(key)
        return { key, value }
      }),
    )

    return allResults
  }

  public set(key: string, value: any): Promise<any> {
    return this.client.set(key, value, { EX: this.tokenExpiryTime })
  }

  public setJson(key: string, value: any): Promise<any> {
    return this.client.set(key, value, { EX: this.tokenExpiryTime })
  }

  public setTokenExpiryTime(time: number) {
    this.tokenExpiryTime = time
  }

  public deleteOne(key: string): Promise<number> {
    return this.client.del(key)
  }

  public testConnection(): Promise<any> {
    return this.client.set("test", "connected")
  }
}
