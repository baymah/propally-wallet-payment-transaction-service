import { writeConnection } from "./DatabaseModule"

export class UnitOfWork {
  public async startTransaction(level?: "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE"): Promise<void> {
    level ? await writeConnection.startTransaction(level) : await writeConnection.startTransaction()
  }

  public async commitTransaction(): Promise<void> {
    await writeConnection.commitTransaction()
  }

  public async rollbackTransaction(): Promise<void> {
    await writeConnection.rollbackTransaction()
  }

  async complete(work: () => void) {
    try {
      await work()
      await this.commitTransaction()
    } catch (error) {
      await this.rollbackTransaction()
      throw error
    } finally {
      // await writeConnection.release()
    }
  }
}
