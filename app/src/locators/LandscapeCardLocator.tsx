import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { totemTokenDescription } from '../material/TotemTokenDescription'
import { LandscapeCardDescription } from './descriptions/LandscapeCardDescription'

class LandscapeCardLocator extends FlexLocator {
  parentItemType = MaterialType.LandscapeCard

  getParentItem(location: Location, { material }: ItemContext) {
    return material[this.parentItemType]!
      .staticItems
      .find((i) => location.id === i.id)!
  }

  positionOnParent = { x: 24.5, y: 81.5 }
  gap = { x: totemTokenDescription.width + 0.7 }
  lineGap = { y: -(totemTokenDescription.height + 0.05) }
  lineSize = 2
  maxLines = 3

  locationDescription = new LandscapeCardDescription()
}

export const landscapeCardLocator = new LandscapeCardLocator()