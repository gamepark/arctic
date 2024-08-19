import { FlexLocator } from '@gamepark/react-game'
import { powerCardDescription } from '../material/PowerCardDescription'

class PowerLocator extends FlexLocator {
  coordinates = { x: 30, y: -6.5, z: 0 }
  gap = { x: powerCardDescription.height + 0.5, y: 0 }
  lineSize = 2
  lineGap = { x: 0, y: powerCardDescription.width + 0.5 }
  rotateZ = -90
}

export const powerLocator = new PowerLocator()