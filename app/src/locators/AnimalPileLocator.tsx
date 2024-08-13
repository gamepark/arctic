import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { ItemContext, PileLocator, ZoomDirection } from '@gamepark/react-game'
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

    getZoomDirection(item: MaterialItem, context: ItemContext) {
        const { rules } = context
        if (item.location.x === rules.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(item.location.player).length - 1) {
            return context.player === item.location.player? ZoomDirection.Center: ZoomDirection.Bottom
        }

        return
    }

}

export const animalPileLocator = new AnimalPileLocator()