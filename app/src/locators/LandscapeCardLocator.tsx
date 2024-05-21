import { Location } from '@gamepark/rules-api'
import { GridLocator } from '@gamepark/react-game'
import { totemTokenDescription } from '../material/TotemTokenDescription'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'

class LandscapeCardLocator extends GridLocator {
    parentItemType = MaterialType.LandscapeCard

    getParentItemId(location: Location) {
        return location.id
    }

    positionOnParent = { x: 25, y: 19 }

    itemsGap = { x: totemTokenDescription.width + 0.7, y: 0 }
    itemsPerLine = 2
    linesGap = { x: 0, y: totemTokenDescription.height + 0.05 }
}

export const landscapeCardLocator = new LandscapeCardLocator()