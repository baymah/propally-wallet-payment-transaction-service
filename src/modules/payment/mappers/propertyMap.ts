import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Property } from "../domain/property"

export type Raw = {
  id: string
  name: string
}

export class PropertyMap {
  public static toDTO(property: any): Raw {
    return {
      id: property.id,
      name: property.name,
    }
  }

  public static toDomain(raw: Raw): Property | undefined {
    const propertyOrError = Property.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
    return propertyOrError.isSuccess ? propertyOrError.getValue() : undefined
  }
}
