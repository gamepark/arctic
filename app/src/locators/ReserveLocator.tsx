import { DeckLocator } from '@gamepark/react-game'

class ReserveLocator extends DeckLocator {
  coordinates = { x: -20, y: -10, z: 0 }
  delta = { x: -0.05, y: -0.05 }
}

export const reserveLocator = new ReserveLocator()