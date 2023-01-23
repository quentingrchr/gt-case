import { FarmType, ProductType } from '@types'
import MUIList from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { isFarmType } from '../../utils'

import { FarmItem, ProductItem } from '..'

export type PropsType = {
  items: (ProductType | FarmType)[]
}

const List = ({ items }: PropsType) => {
  if (items.length === 0) {
    return <Typography typography="h5">No results found</Typography>
  }
  return (
    <MUIList
      sx={{
        maxWidth: 345,
        margin: 'auto',
      }}
    >
      {items.map((item) => {
        if (isFarmType(item)) {
          return <FarmItem key={item.id} farm={item} />
        } else {
          return <ProductItem key={item.id} product={item} />
        }
      })}
    </MUIList>
  )
}

export default List
