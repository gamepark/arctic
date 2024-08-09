import { ItemContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { AnimalPileDescription } from './descriptions/AnimalPileDescription'

class AnimalPileLocator extends PileLocator {
    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const { material, type } = context
        const coordinates = this.locationDescription.getPileCoordinates(item.location, context)
        return {
            ...coordinates,
            z: material[type]!.getThickness(item, context) * (item.location.x! + 1)
        }
    }

    locationDescription = new AnimalPileDescription()
    maxAngle = 5
    limit = 100

}

export const animalPileLocator = new AnimalPileLocator()