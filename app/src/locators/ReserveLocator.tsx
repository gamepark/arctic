import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ReserveLocator extends DeckLocator {
  coordinates = { x: -40, y: 4, z: 0 }
  delta = { x: 0.03, y: -0.03 }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.player || context.rules.players.length === 2) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + 5
    }

  }
}

export const reserveLocator = new ReserveLocator()