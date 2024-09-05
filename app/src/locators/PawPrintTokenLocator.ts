import { Locator, MaterialContext } from '@gamepark/react-game'
import {Location } from '@gamepark/rules-api'
import { totemTileLocator } from './PlayerTotemLocator'

export class PawPrintTokenLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = totemTileLocator.getLocationCoordinates(location, context)
    return {
      ...coordinates,
      y: coordinates.y! + 5
    }
  }
}

export const pawPrintTokenLocator =  new PawPrintTokenLocator()