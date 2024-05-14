import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerColor } from '@gamepark/arctic/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { animalCardsDeckLocator } from './AnimalCardsDeckLocator'
import { reserveLocator } from './ReserveLocator'
import { tableCenterLocator } from './TableCenterLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.TableCenter]: tableCenterLocator,
  [LocationType.AnimalCardsDeck]: animalCardsDeckLocator,
  [LocationType.Reserve]: reserveLocator
}
