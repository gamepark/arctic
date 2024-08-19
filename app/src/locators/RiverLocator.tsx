import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { RiverDescription } from './descriptions/RiverDescription'

class RiverLocator extends ListLocator {
    locationDescription = new RiverDescription()
    coordinates = { x: -20, y: 5, z: 0 }
    gap = { x: animalCardDescription.width + 1, y: 0 }

    getLocations(context: MaterialContext): Location[] {
        const { rules } = context
        const river = rules.material(MaterialType.AnimalCard).location(LocationType.River).getItems()
        return river.map((r) => r.location)
    }
}

export const riverLocator = new RiverLocator()