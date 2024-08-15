import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../../material/AnimalCardDescription'

export class RiverDescription extends LocationDescription {
  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const river = rules.material(MaterialType.AnimalCard).location(LocationType.River).getItems()
    return river.map((r) => r.location)
  }

  originCoordinates = { x: -20, y: 5, z: 0 }

  getCoordinates(location: Location, _context: LocationContext) {
    const coordinates = this.originCoordinates
    return {
      ...coordinates,
      x: coordinates.x + (animalCardDescription.width + 1) * location.x!,
      z: 1
    }
  }

  width = animalCardDescription.width
  height = animalCardDescription.height
  borderRadius = animalCardDescription.borderRadius
}