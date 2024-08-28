import { LocationDescription, Locator } from '@gamepark/react-game'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { AnimalPileScoringHelp } from './help/AnimalPileScoringHelp'

class AnimalPileScoringLocator extends Locator {
  locationDescription = new AnimalPileScoringDescription(animalCardDescription)
}

class AnimalPileScoringDescription extends LocationDescription {
  help = AnimalPileScoringHelp
}

export const animalPileScoringLocator = new AnimalPileScoringLocator()