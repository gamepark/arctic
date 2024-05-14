import { AnimalCard } from '@gamepark/arctic/material/AnimalCard'
import { landscapes } from '@gamepark/arctic/material/Landscape'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { CardDescription } from '@gamepark/react-game'
import BearFox1 from '../images/cards/animals/BearFox1.jpg'
import BearFox3 from '../images/cards/animals/BearFox3.jpg'
import BearFox4 from '../images/cards/animals/BearFox4.jpg'
import BearFox5 from '../images/cards/animals/BearFox5.jpg'

class AnimalCardDescription extends CardDescription {

  images = {
    [AnimalCard.BearFox1]: BearFox1,
    [AnimalCard.BearFox3]: BearFox3,
    [AnimalCard.BearFox4]: BearFox4,
    [AnimalCard.BearFox5]: BearFox5
  }

  staticItems = landscapes.map((landscape, index) => ({ id: landscape, location: { type: LocationType.TableCenter, x: index } }))
}

export const animalCardDescription = new AnimalCardDescription()
