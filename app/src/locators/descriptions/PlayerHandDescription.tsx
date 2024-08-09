import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ComponentSize, getRelativePlayerIndex, LocationDescription, MaterialContext } from '@gamepark/react-game'
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
            y: coordinates.y - 1,
            z: 5
        }
    }

    getHandCoordinates(location: Location, context: MaterialContext): Coordinates {
        const index = getRelativePlayerIndex(context, location.player)
        const position = getPlayerPosition(context.rules.players.length, index)
        if (context.player && index === 0) {
            position.x += 1.5
        }

        return position
    }

    getSize(_location: Location<number, number>, context: MaterialContext<number, number, number>): ComponentSize {
        const { rules, player } = context
        const count = rules.material(MaterialType.AnimalCard).location(LocationType.PlayerHand).player(player).length || 1
        return {
            width: Math.min((animalCardDescription.width + 0.7) * count, (animalCardDescription.width + 0.2) * 6.6),
            height: (animalCardDescription.height) + (count * 0.5),
        }
    }
}

export const playerHandDescription = new PlayerHandDescription()