import React, { useState } from 'react'
import { List, Map } from '@components'
import { CircularProgress, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { ProductType, FarmType } from '@types'
import PanelFilters from './panel-filters'
import {
  FilterTypeType,
  FILTER_TYPE,
  FilterSearchType,
} from './filter-type.type'
import { filterList } from './filter-list'
import { useSubscribeCollection } from '@hooks'
import { getMarkersFromObjects } from '../../utils'

const Panel = () => {
  const farms = useSubscribeCollection<FarmType>('farms')
  const products = useSubscribeCollection<ProductType>('products')
  const isLoading = farms.loading || products.loading
  const error = farms.error || products.error
  const [search, setSearch] = useState<FilterSearchType>(undefined)
  const [type, setType] = useState<FilterTypeType>(FILTER_TYPE.none)
  const filteredList = filterList(
    [...products.data, ...farms.data],
    search,
    type
  )

  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Map markersData={getMarkersFromObjects(filteredList)} />
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          minWidth: 345,
          margin: 'auto',
          display: 'flex',
          height: '100vh',
          overflow: 'scroll',
          paddingTop: 6,
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
          {isLoading ? <CircularProgress /> : <List items={filteredList} />}
        </Box>
      </Stack>
    </Stack>
  )
}

export default Panel
