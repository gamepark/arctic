import { DeckLocator } from '@gamepark/react-game'

class AnimalCardsDeckLocator extends DeckLocator {
  coordinates = { x: -10, y: -10, z: 0 }
  delta = { x: -0.05, y: -0.05 }
}

export const animalCardsDeckLocator = new AnimalCardsDeckLocator()