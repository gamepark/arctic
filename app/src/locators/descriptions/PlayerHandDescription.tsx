import { LocationType } from '@gamepark/arctic/material/LocationType'
import { getRelativePlayerIndex, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../../material/AnimalCardDescription'
import { getPlayerPosition } from '../PlayerPosition'

class PlayerHandDescription extends LocationDescription {
    getLocations(context: MaterialContext): Location[] {
        if (context.player === undefined)
            return []
        else
            return [{ type: LocationType.PlayerHand, player: context.player }]
    }
    borderRadius = animalCardDescription.borderRadius

    getCoordinates(location: Location, context: MaterialContext): Coordinates {
        const coordinates = this.getHandCoordinates(location, context)
        return {
            ...coordinates,
            y: coordinates.y,
            z: 5
        }
    }

    getHandCoordinates(location: Location, context: MaterialContext): Coordinates {
        const index = getRelativePlayerIndex(context, location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x -= 13
        }

        return position
    }

    width = (animalCardDescription.width + 0.7) * 6.6
    height = (animalCardDescription.height + 2) + (6.6 * 0.5)
}

export const playerHandDescription = new PlayerHandDescription()