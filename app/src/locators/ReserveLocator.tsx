import { DeckLocator } from '@gamepark/react-game'

class ReserveLocator extends DeckLocator {
  coordinates = { x: -40, y: 5, z: 0 }
  delta = { x: 0.03, y: -0.03 }
}

export const reserveLocator = new ReserveLocator()