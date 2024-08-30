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

    coordinates = { z: 1}

    getPositionOnParent(location: Location) {
        if(location.x !== undefined) {
            return { x: 25, y: 81 }
        } else {
            return { x: 50, y: 50 }
        }
    }

    getGap(location: Location) {
        if (location.x === undefined) return {}
        return { x: totemTokenDescription.width + 0.7, y: 0 }
    }

    getLineGap(location: Location) {
        if (location.x === undefined) return {}
        return { x: 0, y: -(totemTokenDescription.height + 0.05) }
    }

    lineSize = 2
    locationDescription = new LandscapeCardDescription()
}

export const landscapeCardLocator = new LandscapeCardLocator()