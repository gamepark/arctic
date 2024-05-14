import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerColor } from '@gamepark/arctic/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { tableCenterLocator } from './TableCenterLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.TableCenter]: tableCenterLocator
}
