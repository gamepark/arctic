/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export enum AnimalIcon {
  Main = 1, Associated
}

export class AnimalIconLocator extends Locator {
  locationDescription = new AnimalIconDescription()
  parentItemType = MaterialType.AnimalCard

  getPositionOnParent(location: Location) {
    if (location.id === AnimalIcon.Main) return {x: 13.7, y: 10.2}
    if (location.id === AnimalIcon.Associated) return {x: 31.1, y: 10.1}
    return { x: 0, y: 0 }
  }
}

class AnimalIconDescription extends LocationDescription {
  width = 1.3
  height = 1.3
  borderRadius = 5
}

export const animalIconLocator = new AnimalIconLocator()