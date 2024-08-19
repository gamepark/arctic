import { ListLocator } from '@gamepark/react-game'
import { landscapeCardDescription } from '../material/LandscapeCardDescription'

class TableCenterLocator extends ListLocator {
  coordinates = { x: -20, y: -5, z: 0 }
  gap = { x: landscapeCardDescription.width + 1, y: 0 }
}

export const tableCenterLocator = new TableCenterLocator()