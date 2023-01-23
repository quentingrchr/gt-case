import { ProductType, FarmType } from '@types'
export const isProductType = (
  type: ProductType | FarmType
): type is ProductType => {
  return (type as ProductType).alias !== undefined
}

export default isProductType
