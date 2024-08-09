import { LocationType } from '@gamepark/arctic/material/LocationType'
import { getRelativePlayerIndex, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { getPlayerPosition } from '../PlayerPosition'

export class AnimalPileDescription extends LocationDescription {
    getLocations(context: MaterialContext): Location[] {
        if (!context.player) return []
        return [{ type: LocationType.AnimalPile, player: context.player }]
    }

    getCoordinates(location: Location, context: MaterialContext) {
        const coordinates = this.getPileCoordinates(location, context)
        return {
            ...coordinates,
            z: 5
        }
    }

    getPileCoordinates(location: Location, context: MaterialContext) {
        const index = getRelativePlayerIndex(context, location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x += animalCardDescription.width * 5
        } else {
            position.x += animalCardDescription.width + 1.5
        }
        return position
    }


    width = animalCardDescription.width * 1.2
    height = animalCardDescription.height * 1.2
    borderRadius = animalCardDescription.borderRadius
}