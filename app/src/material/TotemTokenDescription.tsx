import { TotemToken } from '@gamepark/arctic/material/TotemToken'
import { TokenDescription } from '@gamepark/react-game'

import Bear from '../images/tokens/BearToken.png'
import Fox from '../images/tokens/FoxToken.png'
import Moose from '../images/tokens/MooseToken.png'
import Orca from '../images/tokens/OrcaToken.png'
import Puffin from '../images/tokens/PuffinToken.png'
import Walrus from '../images/tokens/WalrusToken.png'

class TotemTokenDescription extends TokenDescription {
    width = 2.55
    height = 2.75

    images = {
        [TotemToken.Bear]: Bear,
        [TotemToken.Fox]: Fox,
        [TotemToken.Moose]: Moose,
        [TotemToken.Orca]: Orca,
        [TotemToken.Puffin]: Puffin,
        [TotemToken.Walrus]: Walrus,
    }
}

export const totemTokenDescription = new TotemTokenDescription()