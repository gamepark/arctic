import { LocationType } from '@gamepark/arctic/material/LocationType'
import { getRelativePlayerIndex, isItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { PenaltyZoneDescription } from './descriptions/PenaltyZoneDescription'
import { getPlayerPosition } from './PlayerPosition'

class PenaltyZoneLocator extends PileLocator {
  limit = 100
  maxAngle = 5
  locationDescription = new PenaltyZoneDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = this.getPenaltyZoneCoordinates(location, context)
    return {
      ...coordinates,
      z: location.x? animalCardDescription.thickness * (location.x + 1): 0
    }
  }

  getMaxAngle(location: Location, context: MaterialContext) {
    if (isItemContext(context)) return super.getMaxAngle(location, context)
    return 0
  }

  getItemIndex(item: MaterialItem): number {
    return item.location.x!
  }

  getLocations(context: MaterialContext): Location[] {
    return context.rules.players.map((player) => ({
      type: LocationType.PenaltyZone,
      player
    }))
  }

  getPenaltyZoneCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index, !context.player)
    if ((context.player && index === 0) || context.rules.players.length === 2) {
      position.x -= animalCardDescription.width * 7
    } else {
      position.x -= animalCardDescription.width + 1.5
    }

    return position
  }
}

export const penaltyZoneLocator = new PenaltyZoneLocator()