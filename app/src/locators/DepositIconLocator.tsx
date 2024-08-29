/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'


export class DepositIconLocator extends Locator {
  locationDescription = new DrawIconDescription()
  parentItemType = MaterialType.AnimalCard
  positionOnParent = {x: 13, y: 49}
}

class DrawIconDescription extends LocationDescription {
  width = 1.7
  height = 1.7
  borderRadius = 5
}

export const depositIconLocator = new DepositIconLocator()