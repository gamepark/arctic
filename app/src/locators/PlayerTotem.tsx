import { DeckLocator } from '@gamepark/react-game'

class TotemTileLocator extends DeckLocator {
  coordinates = { x: 30, y: -10, z: 0 }
  delta = { x: -0.05, y: -0.05 }
}

export const totemTileLocator = new TotemTileLocator()