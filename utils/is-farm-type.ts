import { ProductType, FarmType } from '@types'
export const isFarmType = (type: ProductType | FarmType): type is FarmType => {
  return (type as FarmType).contact !== undefined
}

export default isFarmType
