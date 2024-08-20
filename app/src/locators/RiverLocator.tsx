import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { RiverDescription } from './descriptions/RiverDescription'

class RiverLocator extends ListLocator {
    locationDescription = new RiverDescription()
    coordinates = { x: -20, y: 4, z: 0 }
    gap = { x: animalCardDescription.width + 1, y: 0 }

    getLocations(context: MaterialContext): Location[] {
        const { rules } = context
        const river = rules.material(MaterialType.AnimalCard).location(LocationType.River).getItems()
        return river.map((r) => r.location)
    }

    getCoordinates(_location: Location, context: MaterialContext) {
        if (context.player || context.rules.players.length === 2) return this.coordinates
        return {
            ...this.coordinates,
            x: this.coordinates.x + 8
        }

    }
}

export const riverLocator = new RiverLocator()