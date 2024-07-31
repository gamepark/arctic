import { Location } from '@gamepark/rules-api'
import { GridLocator } from '@gamepark/react-game'
import { totemTokenDescription } from '../material/TotemTokenDescription'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LandscapeCardDescription } from './descriptions/LandscapeCardDescription'

class LandscapeCardLocator extends GridLocator {
    parentItemType = MaterialType.LandscapeCard

    getParentItemId(location: Location) {
        return location.id
    }

    getPositionOnParent(location: Location) {
        if(location.x !== undefined) {
            return { x: 25, y: 19 }
        } else {
            return { x: 50, y: 50 }
        }
    }

    itemsGap = { x: totemTokenDescription.width + 0.7, y: 0 }
    itemsPerLine = 2
    linesGap = { x: 0, y: totemTokenDescription.height + 0.05 }
    locationDescription = new LandscapeCardDescription()
}

export const landscapeCardLocator = new LandscapeCardLocator()