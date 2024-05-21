import { GridLocator } from '@gamepark/react-game'
import { powerCardDescription } from '../material/PowerCardDescription'

class PowerLocator extends GridLocator {
  coordinates = { x: 30, y: -10, z: 0 }
  itemsGap = { x: powerCardDescription.width + 1, y: 0 }
  itemsPerLine = 2
  linesGap = { x: 0, y: powerCardDescription.ratio + 1 }
}

export const powerLocator = new PowerLocator()