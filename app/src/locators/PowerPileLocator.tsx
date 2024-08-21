import { FlexLocator, getRelativePlayerIndex, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { powerCardDescription } from '../material/PowerCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class PowerPileLocator extends FlexLocator {
  lineGap = { y: powerCardDescription.height - 0.4, z: 0.05 }
  lineSize = 2


  getLineSize(location: Location, context: ItemContext): number {
    if (context.rules.players.length !== 2 && (!context.player || location.player !== context.player)) return 6
    return 2
  }

  getGap(location: Location, context: ItemContext): Partial<Coordinates> {
    if (context.rules.players.length !== 2 && (!context.player || location.player !== context.player)) return { x: powerCardDescription.width * 0.3, z: 0.05 }
    return { x: powerCardDescription.width + 0.2, z: 0.05 }
  }

  getCoordinates(location: Location, context: ItemContext): Coordinates {
    const index = getRelativePlayerIndex(context, location.player)
    const position = getPlayerPosition(context.rules.players.length, index, !context.player)
    if ((context.player && index === 0) || context.rules.players.length === 2) {
      position.x += animalCardDescription.width * 5.5
      position.y -= powerCardDescription.height * 0.7
      if (context.rules.players.length === 2 && index === 1) {
        position.y -= powerCardDescription.height * 0.3
      }
    } else {
      if (context.player) {
        position.y += animalCardDescription.height
        position.x -= animalCardDescription.width
      } else {
        position.x += animalCardDescription.width * 2.7
      }
    }
    return position
  }
}

export const powerPileLocator = new PowerPileLocator()