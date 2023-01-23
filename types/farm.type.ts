import { GeoPointType } from './'
export type FarmType = {
  id: string
  name: string
  location: GeoPointType
  contact: {
    nom: string
    prenom: string
    tel: string
    email: string
  }
}
