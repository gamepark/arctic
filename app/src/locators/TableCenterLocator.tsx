import { LineLocator } from '@gamepark/react-game'
import { landscapeCardDescription } from '../material/LandscapeCardDescription'

class TableCenterLocator extends LineLocator {
  coordinates = { x: -20, y: -5, z: 0 }
  delta = { x: landscapeCardDescription.width + 1, y: 0 }
}

export const tableCenterLocator = new TableCenterLocator()