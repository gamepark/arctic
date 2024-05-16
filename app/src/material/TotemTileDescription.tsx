import { TotemTile } from '@gamepark/arctic/material/TotemTile'
import { CardDescription } from '@gamepark/react-game'

import Bear from '../images/tiles/TotemBear.png'
import Fox from '../images/tiles/TotemFox.png'
import Moose from '../images/tiles/TotemMoose.png'
import Orca from '../images/tiles/TotemOrca.png'
import Puffin from '../images/tiles/TotemPuffin.png'
import Walrus from '../images/tiles/TotemWalrus.png'

class TotemTileDescription extends CardDescription {

  images = {
    [TotemTile.Bear]: Bear,
    [TotemTile.Fox]: Fox,
    [TotemTile.Moose]: Moose,
    [TotemTile.Orca]: Orca,
    [TotemTile.Puffin]: Puffin,
    [TotemTile.Walrus]: Walrus,
  }
}

export const totemTileDescription = new TotemTileDescription()