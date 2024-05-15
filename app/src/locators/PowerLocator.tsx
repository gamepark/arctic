import { LineLocator } from '@gamepark/react-game'
import { powerCardDescription } from '../material/PowerCardDescription'

class PowerLocator extends LineLocator {
  coordinates = { x: 0, y: -10, z: 0 }
  delta = { x: powerCardDescription.width + 1, y: 0 }
}

export const powerLocator = new PowerLocator()