import { ItemContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PenaltyZoneDescription } from './descriptions/PenaltyZoneDescription'

class PenaltyZoneLocator extends PileLocator {
  limit = 100
  maxAngle = 5
  delta = { x: 0.03, y: -0.03 }
  locationDescription = new PenaltyZoneDescription()

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { material, type } = context
    const coordinates = this.locationDescription.getPenaltyZoneCoordinates(item.location, context)
    return {
      ...coordinates,
      z: material[type]!.getThickness(item, context) * (item.location.x! + 1)
    }
  }

  getItemIndex(item: MaterialItem): number {
    return item.location.x!
  }
}

export const penaltyZoneLocator = new PenaltyZoneLocator()