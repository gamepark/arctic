import { GridLocator } from '@gamepark/react-game'
import { totemTokenDescription } from '../material/TotemTokenDescription'

class TotemTokensLocator extends GridLocator {
    coordinates = { x: 0, y: -10, z: 0.01 }
    itemsGap = { x: totemTokenDescription.width + 1, y: 0 }
    itemsPerLine = 2
    linesGap = { x: 0, y: totemTokenDescription.height + 1 }
}

export const totemTokensLocator = new TotemTokensLocator()