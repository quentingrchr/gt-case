import { FarmType, ProductType } from '@types'
import {
  FilterSearchType,
  FilterTypeType,
  FILTER_TYPE,
} from './filter-type.type'
import { isFarmType, isProductType } from '../../utils'

type ListType = (FarmType | ProductType)[]

export function filterList(
  list: ListType,
  search: FilterSearchType,
  type: FilterTypeType
) {
  const newList = [...list]
  if (search) {
    const searchLowercased = search?.toLowerCase()
    return newList.filter((item) => {
      if (isFarmType(item)) {
        const {
          name,
          contact: { email, tel, nom, prenom },
        } = item
        return (
          name.toLocaleLowerCase().includes(searchLowercased) ||
          email.toLocaleLowerCase().includes(searchLowercased) ||
          tel.toLocaleLowerCase().includes(searchLowercased) ||
          nom.toLocaleLowerCase().includes(searchLowercased) ||
          prenom.toLocaleLowerCase().includes(searchLowercased)
        )
      }
      if (isProductType(item)) {
        const { name, alias } = item
        return (
          (alias !== '' &&
            alias?.toLocaleLowerCase().includes(searchLowercased)) ||
          name.toLocaleLowerCase().includes(searchLowercased)
        )
      }
    })
  }

  if (type !== FILTER_TYPE.none) {
    if (type === FILTER_TYPE.farms) {
      return newList.filter((item) => isFarmType(item))
    }
    if (type === FILTER_TYPE.products) {
      return newList.filter((item) => isProductType(item))
    }
  }

  return newList
}
