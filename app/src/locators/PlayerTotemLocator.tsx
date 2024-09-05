import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class TotemTileLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index, !context.player)
    if ((context.player && index === 0) || context.rules.players.length === 2) {
      position.x += animalCardDescription.width * 4.2
    } else {
      position.x -= animalCardDescription.width * 2.2
    }

    if (location.player === context.rules.players[0]) {
      position.y -= 2
    }

    return position
  }
}

export const totemTileLocator = new TotemTileLocator()