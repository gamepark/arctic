import { GridLocator } from '@gamepark/react-game'
import { powerCardDescription } from '../material/PowerCardDescription'

class PowerLocator extends GridLocator {
  coordinates = { x: 30, y: -6.5, z: 0 }
  itemsGap = { x: powerCardDescription.height + 0.5, y: 0 }
  itemsPerLine = 2
  linesGap = { x: 0, y: powerCardDescription.width + 0.5 }

  rotateZ = -90
}

export const powerLocator = new PowerLocator()