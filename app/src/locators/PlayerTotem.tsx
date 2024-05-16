import { ItemContext, ItemLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { MaterialItem, Coordinates } from '@gamepark/rules-api'

class TotemTileLocator extends ItemLocator {
  getPosition(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): Coordinates {
    const index = getRelativePlayerIndex(context, item.location.player)
    switch (index) {
      case 0:
        return { x: 0, y: 15, z: 0 }
      case 1:
        return { x: -15, y: -15, z: 0 }
      case 2:
        return { x: 0, y: -15, z: 0 }
      default:
        return { x: 15, y: -15, z: 0 }
    }
  }
}

export const totemTileLocator = new TotemTileLocator()