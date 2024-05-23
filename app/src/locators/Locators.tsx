import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { ItemLocator } from '@gamepark/react-game'
import { animalCardsDeckLocator } from './AnimalCardsDeckLocator'
import { reserveLocator } from './ReserveLocator'
import { tableCenterLocator } from './TableCenterLocator'
import { powerLocator } from './PowerLocator'
import { totemTileLocator } from './PlayerTotemLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { landscapeCardLocator } from './LandscapeCardLocator'
import { riverLocator } from './RiverLocator'
import { animalPileLocator } from './AnimalPileLocator'
import { powerPileLocator } from './PowerPileLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.TableCenter]: tableCenterLocator,
  [LocationType.AnimalCardsDeck]: animalCardsDeckLocator,
  [LocationType.Reserve]: reserveLocator,
  [LocationType.Powers]: powerLocator,
  [LocationType.PlayerTotem]: totemTileLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.LandscapeCard]: landscapeCardLocator,
  [LocationType.River]: riverLocator,
  [LocationType.AnimalPile]: animalPileLocator,
  [LocationType.PowerPile]: powerPileLocator,
}
