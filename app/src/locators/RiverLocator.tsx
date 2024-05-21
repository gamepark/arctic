import { LineLocator } from '@gamepark/react-game'
import { animalCardDescription } from '../material/AnimalCardDescription'

class RiverLocator extends LineLocator {
    coordinates = { x: -20, y: 5, z: 0 }
    delta = { x: animalCardDescription.width + 1, y: 0 }
}

export const riverLocator = new RiverLocator()