import { LocationType } from '@gamepark/arctic/material/LocationType'
import { getRelativePlayerIndex, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { getPlayerPosition } from '../PlayerPosition'

export class PenaltyZoneDescription extends LocationDescription {
  getLocations(context: MaterialContext): Location[] {
    return context.rules.players.map((player) => ({
      type: LocationType.PenaltyZone,
      player
    }))
  }

  getCoordinates(location: Location, context: LocationContext) {
    return {
      ...this.getPenaltyZoneCoordinates(location, context),
      z: 5
    }
  }

  getPenaltyZoneCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index)
    if (context.player && index === 0) {
      position.x -= animalCardDescription.width * 6.3
    } else {
      position.x -= animalCardDescription.width + 1.5
    }
    return position
  }

  width = animalCardDescription.width * 1.2
  height = animalCardDescription.height * 1.2
  borderRadius = animalCardDescription.borderRadius
}