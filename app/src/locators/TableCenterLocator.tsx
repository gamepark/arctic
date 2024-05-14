import { LineLocator } from '@gamepark/react-game'
import { landscapeCardDescription } from '../material/LandscapeCardDescription'

class TableCenterLocator extends LineLocator {
  delta = { x: landscapeCardDescription.width + 1, y: 0 }
}

export const tableCenterLocator = new TableCenterLocator()