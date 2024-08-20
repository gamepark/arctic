import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { Locator } from '@gamepark/react-game'
import { animalCardsDeckLocator } from './AnimalCardsDeckLocator'
import { animalPileLocator } from './AnimalPileLocator'
import { landscapeCardLocator } from './LandscapeCardLocator'
import { penaltyZoneLocator } from './PenaltyZoneLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { totemTileLocator } from './PlayerTotemLocator'
import { powerLocator } from './PowerLocator'
import { powerPileLocator } from './PowerPileLocator'
import { reserveLocator } from './ReserveLocator'
import { riverLocator } from './RiverLocator'
import { scoringLocator } from './ScoringLocator'
import { tableCenterLocator } from './TableCenterLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerId, MaterialType, LocationType>>> = {
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
  [LocationType.PenaltyZone]: penaltyZoneLocator,
  [LocationType.Scoring]: scoringLocator,
}
