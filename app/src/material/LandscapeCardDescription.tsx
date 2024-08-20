import { Landscape, landscapes } from '@gamepark/arctic/material/Landscape'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { CardDescription } from '@gamepark/react-game'
import Landscape0 from '../images/cards/landscapes/Landscape0.jpg'
import Landscape1 from '../images/cards/landscapes/Landscape1.jpg'
import Landscape10 from '../images/cards/landscapes/Landscape10.jpg'
import Landscape15 from '../images/cards/landscapes/Landscape15.jpg'
import Landscape3 from '../images/cards/landscapes/Landscape3.jpg'
import Landscape6 from '../images/cards/landscapes/Landscape6.jpg'
import { LandscapeCardHelp } from './help/LandscapeCardHelp'

class LandscapeCardDescription extends CardDescription {

  images = {
    [Landscape.Landscape0]: Landscape0,
    [Landscape.Landscape1]: Landscape1,
    [Landscape.Landscape3]: Landscape3,
    [Landscape.Landscape6]: Landscape6,
    [Landscape.Landscape10]: Landscape10,
    [Landscape.Landscape15]: Landscape15
  }

  staticItems = landscapes.map((landscape, index) => ({ id: landscape, location: { type: LocationType.TableCenter, x: index } }))

  help = LandscapeCardHelp
}

export const landscapeCardDescription = new LandscapeCardDescription()
