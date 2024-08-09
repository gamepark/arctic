import { ItemContext, ItemLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { MaterialItem, Coordinates } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class TotemTileLocator extends ItemLocator {
  getPosition(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Coordinates {
    const index = getRelativePlayerIndex(context, item.location.player)
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