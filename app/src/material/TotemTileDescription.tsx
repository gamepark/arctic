import { TotemTile } from '@gamepark/arctic/material/TotemTile'
import { TokenDescription } from '@gamepark/react-game'

import Bear from '../images/tiles/TotemBear.jpg'
import Fox from '../images/tiles/TotemFox.jpg'
import Moose from '../images/tiles/TotemMoose.jpg'
import Orca from '../images/tiles/TotemOrca.jpg'
import Puffin from '../images/tiles/TotemPuffin.jpg'
import Walrus from '../images/tiles/TotemWalrus.jpg'
import Back from '../images/tiles/TotemBack.jpg'

class TotemTileDescription extends TokenDescription {
  width = 2.05
  height = 3.04
  borderRadius = 0.35

  images = {
    [TotemTile.Bear]: Bear,
    [TotemTile.Fox]: Fox,
    [TotemTile.Moose]: Moose,
    [TotemTile.Orca]: Orca,
    [TotemTile.Puffin]: Puffin,
    [TotemTile.Walrus]: Walrus,
  }

  backImage = Back
}

export const totemTileDescription = new TotemTileDescription()