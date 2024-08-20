import { Animal } from '@gamepark/arctic/material/Animal'
import { TokenDescription } from '@gamepark/react-game'
import Back from '../images/tiles/TotemBack.jpg'

import Bear from '../images/tiles/TotemBear.jpg'
import Fox from '../images/tiles/TotemFox.jpg'
import Moose from '../images/tiles/TotemMoose.jpg'
import Orca from '../images/tiles/TotemOrca.jpg'
import Puffin from '../images/tiles/TotemPuffin.jpg'
import Walrus from '../images/tiles/TotemWalrus.jpg'
import { TotemTileHelp } from './help/TotemTileHelp'

class TotemTileDescription extends TokenDescription {
  width = 2.26
  height = 3.5
  borderRadius = 0.35

  images = {
    [Animal.Bear]: Bear,
    [Animal.Fox]: Fox,
    [Animal.Moose]: Moose,
    [Animal.Orca]: Orca,
    [Animal.Puffin]: Puffin,
    [Animal.Walrus]: Walrus,
  }

  backImage = Back

  help = TotemTileHelp
}

export const totemTileDescription = new TotemTileDescription()