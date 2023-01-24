import React, { useState, ChangeEvent, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material'

import { Stack } from '@mui/system'
import BadgeIcon from '@mui/icons-material/Badge'
import db from '../../firebase/store'
import { ProductType } from '@types'

export type PropsType = {
  product: ProductType
}

const ProductItem = ({
  product: {
    id,
    name,
    alias,
    location: { _lat, _long },
  },
}: PropsType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newAlias, setNewAlias] = useState(alias)

  async function handleEdit() {
    if (isEditing) {
      if (newAlias !== alias) {
        try {
          await updateDoc(doc(db, 'products', id), {
            alias: newAlias,
          })
        } catch (error) {
          alert('Error updating product')
        }
      }
      setIsEditing(!isEditing)
    } else if (!isEditing) {
      setIsEditing(!isEditing)
    }
  }

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }} key={id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${_lat} / ${_long}`}
        </Typography>
        <Stack direction="row" alignItems={'center'} spacing={2}>
          <TextField
            id="input-alias"
            defaultValue={alias}
            disabled={!isEditing}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNewAlias(event.target.value)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Stack>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          color={isEditing ? 'success' : 'primary'}
          onClick={() => {
            handleEdit()
          }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductItem
