import { FillGapStrategy, PositiveSequenceStrategy, SecretMaterialRules, hideItemId, hideItemIdToOthers } from '@gamepark/rules-api'
import { PlayerId } from './PlayerId'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayAnimalCardsRule } from './rules/PlayAnimalCardsRule'
import { RuleId } from './rules/RuleId'
import { DrawAnimalCardsRule } from './rules/DrawAnimalCardsRule'
import { MoveAnimalTokens } from './rules/MoveAnimalTokens'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArcticRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayAnimalCards]: PlayAnimalCardsRule,
    [RuleId.MoveAnimalTokens]: MoveAnimalTokens,
    [RuleId.DrawAnimalCards]: DrawAnimalCardsRule,
  }

  locationsStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.River]: new FillGapStrategy(),
    },
    [MaterialType.PowerCard]: {
      [LocationType.Powers]: new FillGapStrategy()
    },
    [MaterialType.TotemToken]: {
      [LocationType.LandscapeCard]: new FillGapStrategy()
    },
  }

  hidingStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: hideItemId,
      [LocationType.Reserve]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers
    },
    [MaterialType.TotemTile]: {
      [LocationType.PlayerTotem]: hideItemIdToOthers
    }
  }
}