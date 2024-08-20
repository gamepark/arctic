import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { powerCardDescription } from '../material/PowerCardDescription'
import { Location } from '@gamepark/rules-api'

class PowerLocator extends FlexLocator {
  coordinates = { x: 30, y: -7.7, z: 0 }
  gap = { x: powerCardDescription.height + 0.5, y: 0 }
  lineSize = 2
  lineGap = { x: 0, y: powerCardDescription.width + 0.5 }
  rotateZ = -90

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.player || context.rules.players.length === 2) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + 7
    }

  }
}

export const powerLocator = new PowerLocator()