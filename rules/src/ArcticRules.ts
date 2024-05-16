import { FillGapStrategy, MaterialRules, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArcticRules extends MaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy()
    },
    [MaterialType.PowerCard]: {
      [LocationType.Powers]: new FillGapStrategy()
    }
  }
}