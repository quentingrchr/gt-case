import React, { useState } from 'react'
import { List } from '@components'
import { CircularProgress, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useSubscribeCollection } from '@hooks'
import { ProductType, FarmType } from '@types'
import PanelFilters from './panel-filters'
import {
  FilterTypeType,
  FILTER_TYPE,
  FilterSearchType,
} from './filter-type.type'
import { filterList } from './filter-list'

export type PropsType = {}

const Panel = (props: PropsType) => {
  const farms = useSubscribeCollection<FarmType>('farms')
  const products = useSubscribeCollection<ProductType>('products')
  const isLoading = farms.loading || products.loading
  const error = farms.error || products.error
  const [search, setSearch] = useState<FilterSearchType>(undefined)
  const [type, setType] = useState<FilterTypeType>(FILTER_TYPE.none)
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        minWidth: 345,
        margin: 'auto',
        display: 'flex',
        minHeight: '100vh',
        marginTop: 6,
      }}
    >
      <PanelFilters
        setType={setType}
        setSearch={setSearch}
        type={type}
        search={search}
      />
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List
            items={filterList([...products.data, ...farms.data], search, type)}
          />
        )}
      </Box>
    </Stack>
  )
}

export default Panel
