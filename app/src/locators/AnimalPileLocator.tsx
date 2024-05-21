import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { animalPileDescription } from './descriptions/AnimalPileDescription'

class AnimalPileLocator extends PileLocator {
    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const index = getRelativePlayerIndex(context, item.location.player)
        switch (index) {
            case 0:
                return { x: 20, y: 22, z: 0 }
            case 1:
                return { x: -15, y: -25, z: 0 }
            case 2:
                return { x: 0, y: -25, z: 0 }
            default:
                return { x: 15, y: -25, z: 0 }
        }
    }

    locationDescription = animalPileDescription
    maxAngle = 5

}

export const animalPileLocator = new AnimalPileLocator()