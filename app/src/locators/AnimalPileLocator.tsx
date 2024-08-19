import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { getRelativePlayerIndex, isItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { AnimalPileDescription } from './descriptions/AnimalPileDescription'
import { getPlayerPosition } from './PlayerPosition'

class AnimalPileLocator extends PileLocator {
    getCoordinates(location: Location, context: MaterialContext): Coordinates {
        const { rules } = context
        const coordinates = this.getInnerPileCoordinates(location, context)
        if (isItemContext(context)) return coordinates
        const playerState = new PlayerState(rules.game, location.player!)
        const animalPileLength = playerState.animalPile.length
        if ((playerState.canPlaceCardUnderAnimalPile || playerState.canPlaceCardUnderLastAnimalInPile)) {
            if (location.x === animalPileLength) {
                return {
                    ...coordinates,
                    y: coordinates.y - (animalCardDescription.height / 2 + 1),
                }
            } else {
                return {
                    ...coordinates,
                    y: coordinates.y + (animalCardDescription.height / 2 + 1),
                }
            }
        }


        return coordinates
    }

    locationDescription = new AnimalPileDescription()
    maxAngle = 5
    limit = 100

    getMaxAngle(location: Location, context: MaterialContext) {
        if (isItemContext(context)) return super.getMaxAngle(location, context)
        return 0
    }

    getInnerPileCoordinates(location: Location, context: MaterialContext) {
        const index = getRelativePlayerIndex(context, location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x += animalCardDescription.width * 2.2
        } else {
            position.x += animalCardDescription.width + 1.5
        }
        return position
    }
}

export const animalPileLocator = new AnimalPileLocator()