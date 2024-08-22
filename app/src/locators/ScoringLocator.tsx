import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ScoringLocator extends DeckLocator {
  coordinates = { x: -40, y: 5, z: 5 }
  delta = { x: 0.03, y: -0.03 }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.player || context.rules.players.length === 2) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + 5
    }

  }

  getHoverTransform() {
    return ['scale(3)', `rotateZ(${-this.rotateZ}${this.rotationUnit})`]
  }

  rotateZ = 10
}

export const scoringLocator = new ScoringLocator()