import { Landscape, landscapes } from '@gamepark/arctic/material/Landscape'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Landscape0 from '../images/cards/landscapes/Landscape0.jpg'
import Landscape1 from '../images/cards/landscapes/Landscape1.jpg'
import Landscape10 from '../images/cards/landscapes/Landscape10.jpg'
import Landscape15 from '../images/cards/landscapes/Landscape15.jpg'
import Landscape3 from '../images/cards/landscapes/Landscape3.jpg'
import Landscape6 from '../images/cards/landscapes/Landscape6.jpg'

class LandscapeCardDescription extends CardDescription {

  images = {
    [Landscape.Landscape0]: Landscape0,
    [Landscape.Landscape1]: Landscape1,
    [Landscape.Landscape3]: Landscape3,
    [Landscape.Landscape6]: Landscape6,
    [Landscape.Landscape10]: Landscape10,
    [Landscape.Landscape15]: Landscape15
  }

  getLocations(item: MaterialItem, context: ItemContext) {
    if (!context.player || context.rules.game.rule?.id !== RuleId.MoveAnimalTokens || context.rules.game.rule?.player !== context.player) return []
    return [{
      type: LocationType.LandscapeCard,
      id: item.id
    }]
  }

  staticItems = landscapes.map((landscape, index) => ({ id: landscape, location: { type: LocationType.TableCenter, x: index } }))
}

export const landscapeCardDescription = new LandscapeCardDescription()
