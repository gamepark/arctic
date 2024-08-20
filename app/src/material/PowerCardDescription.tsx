import { PowerCard } from '@gamepark/arctic/material/PowerCard'
import { CardDescription } from '@gamepark/react-game'

import Bear1 from '../images/cards/powers/PowerBear1.jpg'
import Bear2 from '../images/cards/powers/PowerBear2.jpg'
import Fox1 from '../images/cards/powers/PowerFox1.jpg'
import Fox2 from '../images/cards/powers/PowerFox2.jpg'
import Moose1 from '../images/cards/powers/PowerBear1.jpg'
import Moose2 from '../images/cards/powers/PowerMoose2.jpg'
import Orca1 from '../images/cards/powers/PowerOrca1.jpg'
import Orca2 from '../images/cards/powers/PowerOrca2.jpg'
import Puffin1 from '../images/cards/powers/PowerPuffin1.jpg'
import Puffin2 from '../images/cards/powers/PowerPuffin2.jpg'
import Walrus1 from '../images/cards/powers/PowerWalrus1.jpg'
import Walrus2 from '../images/cards/powers/PowerWalrus2.jpg'

class PowerCardDescription extends CardDescription {
  width = 8.89
  height = 6.35

  images = {
    [PowerCard.Bear1]: Bear1,
    [PowerCard.Bear2]: Bear2,
    [PowerCard.Fox1]: Fox1,
    [PowerCard.Fox2]: Fox2,
    [PowerCard.Moose1]: Moose1,
    [PowerCard.Moose2]: Moose2,
    [PowerCard.Orca1]: Orca1,
    [PowerCard.Orca2]: Orca2,
    [PowerCard.Puffin1]: Puffin1,
    [PowerCard.Puffin2]: Puffin2,
    [PowerCard.Walrus1]: Walrus1,
    [PowerCard.Walrus2]: Walrus2
  }
}

export const powerCardDescription = new PowerCardDescription()
