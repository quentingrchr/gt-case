import { FarmType, ProductType, MarkerType } from '@types'
import { isFarmType } from './'

export default function getMarkersFromObjects(
  objects: (ProductType | FarmType)[]
): MarkerType[] {
  return objects.map((object) => {
    const type = isFarmType(object) ? 'farms' : 'products'
    return {
      type,
      id: object.id,
      location: object.location,
    }
  })
}
