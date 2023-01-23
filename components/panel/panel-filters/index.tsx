import React, { useState, ChangeEvent } from 'react'
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material'
import { TextField } from '@mui/material'
import { Stack } from '@mui/material'
import {
  FilterTypeType,
  FILTER_TYPE,
  FilterSearchType,
} from '../filter-type.type'

export type PropsType = {
  setType: (type: FilterTypeType) => void
  setSearch: (search: string) => void
  type: FilterTypeType
  search: FilterSearchType
}

const PanelFilters = ({ setType, setSearch, type, search }: PropsType) => {
  return (
    <FormControl fullWidth>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="space-around"
        padding={2}
        sx={{
          width: '100%',
        }}
      >
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value)
          }}
        />
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Type"
          onChange={(event: SelectChangeEvent) => {
            setType(event.target.value as FilterTypeType)
          }}
        >
          <MenuItem value={FILTER_TYPE.none}>All</MenuItem>
          <MenuItem value={FILTER_TYPE.farms}>Farms</MenuItem>
          <MenuItem value={FILTER_TYPE.products}>Products</MenuItem>
        </Select>
      </Stack>
    </FormControl>
  )
}

export default PanelFilters
