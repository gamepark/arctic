import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { landscapeCardDescription } from '../material/LandscapeCardDescription'

class TableCenterLocator extends ListLocator {
  coordinates = { x: -20, y: -6, z: 0 }
  gap = { x: landscapeCardDescription.width + 1, y: 0 }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (context.player || context.rules.players.length === 2) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + 8
    }

  }
}

export const tableCenterLocator = new TableCenterLocator()