import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerColor } from '@gamepark/arctic/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { animalCardsDeckLocator } from './AnimalCardsDeckLocator'
import { reserveLocator } from './ReserveLocator'
import { tableCenterLocator } from './TableCenterLocator'
import { powerLocator } from './PowerLocator'
import { totemTileLocator } from './PlayerTotemLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { landscapeCardLocator } from './LandscapeCardLocator'
import { riverLocator } from './RiverLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.TableCenter]: tableCenterLocator,
  [LocationType.AnimalCardsDeck]: animalCardsDeckLocator,
  [LocationType.Reserve]: reserveLocator,
  [LocationType.Powers]: powerLocator,
  [LocationType.PlayerTotem]: totemTileLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.LandscapeCard]: landscapeCardLocator,
  [LocationType.River]: riverLocator,
}
