import { FillGapStrategy, PositiveSequenceStrategy, SecretMaterialRules, hideItemId, hideItemIdToOthers } from '@gamepark/rules-api'
import { PlayerColor } from './PlayerColor'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArcticRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType> {
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

  hidingStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: hideItemId,
      [LocationType.Reserve]: hideItemId
    },
    [MaterialType.TotemTile] : {
      [LocationType.PlayerTotem]: hideItemIdToOthers
    }
  }
}