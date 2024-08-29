import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { getRelativePlayerIndex, isItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { AnimalPileDescription } from './descriptions/AnimalPileDescription'
import { getPlayerPosition } from './PlayerPosition'

class AnimalPileLocator extends PileLocator {
    getCoordinates(location: Location, context: MaterialContext): Coordinates {
        const { rules } = context
          //if (!rules.game.rule) return this.getEndOfGamePosition(location, context)
        const coordinates = this.getInnerPileCoordinates(location, context)
        console.log(location)
        if (isItemContext(context)) return coordinates
        const playerState = new PlayerState(rules.game, location.player!)

        if ((playerState.canPlaceCardUnderAnimalPile || playerState.canPlaceCardUnderLastAnimalInPile)) {
            if (location.x === undefined) {
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
        const position = getPlayerPosition(context.rules.players.length, index, !context.player)
        if ((context.player && index === 0) || context.rules.players.length === 2) {
            position.x += animalCardDescription.width * 3.2
        } else {
            position.x += animalCardDescription.width + 1.8
        }
        return position
    }

    getLocations(context: MaterialContext): Location[] {
        return context.rules.players.flatMap((player) => {
            const cards = context.rules
              .material(MaterialType.AnimalCard)
              .location(LocationType.AnimalPile)
              .player(player).length

            if (cards) return []
            return [{ type: LocationType.AnimalPile, player }]
        })
    }
}

export const animalPileLocator = new AnimalPileLocator()