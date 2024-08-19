import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class TotemTileLocator extends Locator {
  getLocationCoordinates(location: Location, context: MaterialContext): Coordinates {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index)
    if (context.player && index === 0) {
      position.x += animalCardDescription.width * 3.2
    } else {
      position.x -= animalCardDescription.width * 2.2
    }

    return position
  }
}

export const totemTileLocator = new TotemTileLocator()