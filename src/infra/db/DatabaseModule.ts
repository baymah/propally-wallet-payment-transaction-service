import * as dotenv from "dotenv"
dotenv.config()
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, QueryRunner, Repository, SelectQueryBuilder } from "typeorm"
import { Config } from "../../config/configuration"
import { UserNotification } from "./models/notification"
import { PropertyInvestmentNotificationEntity } from "./models/propertyNotification"
import { UserEntity } from "./models/UserEntity"
import { PropertyEntity } from "./models/Property"
import { ActivityEntity } from "./models/activities"
interface WriteConnection {
  readonly startTransaction: (level?: "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE") => Promise<void>
  readonly commitTransaction: () => Promise<void>
  readonly rollbackTransaction: () => Promise<void>
  readonly release: () => Promise<void>
  readonly isTransactionActive: boolean
  readonly manager: EntityManager
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(target: EntityTarget<T>) => Repository<T>
  readonly query: (query: string) => Promise<void>
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(entityClass: EntityTarget<Entity>, alias: string, queryRunner?: QueryRunner) => SelectQueryBuilder<Entity>
}

export let writeConnection: QueryRunner
export let readConnection = {} as ReadConnection

export class DatabaseService {
  private readonly dataSource: DataSource

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: Config.DATABASE_HOST,
      port: Config.DATABASE_PORT,
      database: Config.DATABASE_NAME,
      username: Config.DATABASE_USER,
      password: Config.DATABASE_PASSWORD,
      synchronize: Config.DATABASE_SYNC,
      logging: Config.DATABASE_LOGGING,
      entities: [UserEntity, PropertyEntity, ActivityEntity, UserNotification, PropertyInvestmentNotificationEntity],
      ssl: true,
      migrations: ["src/lib/infra/db/migrations/*{.js}"],
    })
  }

  async initialize() {
    await this.dataSource.initialize()
    if (!this.dataSource.isInitialized) {
      throw new Error("DataSource is not initialized")
    }
    writeConnection = this.dataSource.createQueryRunner("master")
    readConnection = this.dataSource.manager
  }

  async destroy() {
    await this.dataSource.destroy()
  }
}
