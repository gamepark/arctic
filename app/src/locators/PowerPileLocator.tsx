import { getRelativePlayerIndex, GridLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { powerCardDescription } from '../material/PowerCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class PowerPileLocator extends GridLocator {
    // TODO: remove when itemGap is a function
    itemsGap = {}
    linesGap = { y: animalCardDescription.width + 0.2}
    itemsPerLine = 2
    getPosition(item: MaterialItem, context: ItemContext): Coordinates {
        const { x, y, z } = this.getCoordinates(item, context)
        const index = this.getItemIndex(item, context)
        const itemIndex = index % this.getItemPerLine(item, context)
        const lineIndex = Math.floor(index / this.getItemPerLine(item, context))
        const lineGap = this.getLinesGap(item, context)
        const itemGap = this.getItemGap(item, context)
        return {
            x: x + itemIndex * (itemGap.x ?? 0) + lineIndex * (lineGap.x ?? 0),
            y: y + itemIndex * (itemGap.y ?? 0) + lineIndex * (lineGap.y ?? 0),
            z: z + itemIndex * (itemGap.z ?? 0) + lineIndex * (lineGap.z ?? 0)
        }
    }

    getItemPerLine(item: MaterialItem, context: ItemContext): number {
        if (!context.player || item.location.player !== context.player) return 6
        return 2
    }

    getItemGap(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
        if (!context.player || item.location.player !== context.player) return { x: powerCardDescription.height * 0.1, z: 0.5 }
        return { x: powerCardDescription.height + 0.2, z: 0.05 }
    }

    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const index = getRelativePlayerIndex(context, item.location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x += animalCardDescription.width * 4.5
            position.y -= animalCardDescription.width * 0.8
        } else {
            position.y += animalCardDescription.height
        }
        return position
    }

    rotateZ = -90

}

export const powerPileLocator = new PowerPileLocator()