export abstract class Mapper<DomainEntityOrValueObject> {
  public static serializeObj(obj: Record<string, any>) {
    return JSON.stringify(obj)
  }

  public static deserializeObj(data: string) {
    return JSON.parse(data)
  }
}
