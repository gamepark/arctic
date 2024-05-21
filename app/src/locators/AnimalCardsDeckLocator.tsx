import { DeckLocator } from '@gamepark/react-game'

class AnimalCardsDeckLocator extends DeckLocator {
  coordinates = { x: -30, y: 5, z: 0 }
  delta = { x: 0.03, y: -0.03 }
}

export const animalCardsDeckLocator = new AnimalCardsDeckLocator()