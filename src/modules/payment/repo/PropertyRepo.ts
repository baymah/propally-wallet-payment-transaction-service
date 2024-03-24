import { PropertyEntity } from "../../../infra/db/models/Property"
import { Property } from "../domain/property"
import { PropertyMap } from "../mappers/propertyMap"

export interface IPropertyRepo {
  get(propertyId: string)
}

export class PropertyRepo implements IPropertyRepo {
  private models: any
  DEFAULT_PAGE = 0
  DEFAULT_SIZE = 5

  //#region ctor
  constructor(models: any) {
    this.models = models
  }
  //#endregion

  public async get(propertyId: string): Promise<Property | null> {
    try {
      const result = await PropertyEntity.find({ where: { id: propertyId } })
      if (!result.length) return null

      return PropertyMap.toDomain(result[0])
    } catch (error) {
      console.log(error.message)
    }
  }
}
