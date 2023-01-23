import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import PinDropIcon from '@mui/icons-material/PinDrop'
import { FarmType } from '@types'

export type PropsType = {
  farm: FarmType
}

const FarmItem = (props: PropsType) => {
  const {
    farm: {
      id,
      name,
      location: { _lat, _long },
      contact: { email, nom, prenom, tel },
    },
  } = props
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PinDropIcon />
            </ListItemIcon>
            <ListItemText primary={`${_lat} / ${_long}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`${nom} ${prenom}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={`${email} / ${tel}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default FarmItem
