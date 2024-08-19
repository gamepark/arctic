import { FlexLocator, getRelativePlayerIndex, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { powerCardDescription } from '../material/PowerCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class PowerPileLocator extends FlexLocator {
    lineGap = { y: animalCardDescription.width - 0.4, z: 0.05}
    lineSize = 2



    getLineSize(location: Location, context: ItemContext): number {
        if (!context.player || location.player !== context.player) return 6
        return 2
    }

    getGap(location: Location, context: ItemContext): Partial<Coordinates> {
        if (!context.player || location.player !== context.player) return { x: powerCardDescription.height * 0.3, z: 0.05 }
        return { x: powerCardDescription.height + 0.2, z: 0.05 }
    }

    getCoordinates(location: Location, context: ItemContext): Coordinates {
        const index = getRelativePlayerIndex(context, location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x += animalCardDescription.width * 4.5
            position.y -= animalCardDescription.width * 0.7
        } else {
            position.y += animalCardDescription.height
            position.x -= animalCardDescription.width
        }
        return position
    }

    rotateZ = -90

}

export const powerPileLocator = new PowerPileLocator()