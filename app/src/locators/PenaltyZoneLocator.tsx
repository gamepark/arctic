import { DeckLocator, getRelativePlayerIndex, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { getPlayerPosition } from './PlayerPosition'

class PenaltyZoneLocator extends DeckLocator {
    delta = { x: 0.03, y: -0.03 }
    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const index = getRelativePlayerIndex(context, item.location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x -= animalCardDescription.width * 6.3
        } else {
            position.x -= animalCardDescription.width + 1.5
        }
        return position
    }
}

export const penaltyZoneLocator = new PenaltyZoneLocator()