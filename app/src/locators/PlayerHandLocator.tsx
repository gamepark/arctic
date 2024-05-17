import { HandLocator, ItemContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class PlayerHandLocator extends HandLocator {
    getCoordinates(location: Location, context: ItemContext): Coordinates {
        const index = getRelativePlayerIndex(context, location.player)
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

    getMaxAngle(item: MaterialItem, context: ItemContext): number {
        if (item.location.player === context.player) {
            return 15
        }
        else {
            return 2
        }
    }
}

export const playerHandLocator = new PlayerHandLocator()