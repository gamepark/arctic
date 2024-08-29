/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'


export class DrawIconLocator extends Locator {
  locationDescription = new DrawIconDescription()
  parentItemType = MaterialType.AnimalCard
  positionOnParent = {x: 50.5, y: 9.9}
}

class DrawIconDescription extends LocationDescription {
  width = 1.5
  height = 1.5
  borderRadius = 5
}

export const drawIconLocator = new DrawIconLocator()