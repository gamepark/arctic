import {
  CompetitiveScore,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  isMoveItemType,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { BearRule } from './rules/BearRule'
import { DiscardCardsRule } from './rules/DiscardCardsRule'
import { DrawAnimalCardsRule } from './rules/DrawAnimalCardsRule'
import { ScoringHelper } from './rules/helper/ScoringHelper'
import { MoveAnimalTokensRule } from './rules/MoveAnimalTokensRule'
import { PlayAnimalCardsRule } from './rules/PlayAnimalCardsRule'
import { PuffinRule } from './rules/PuffinRule'
import { RuleId } from './rules/RuleId'
import { ScoringRule } from './rules/ScoringRule'
import { WalrusRule } from './rules/WalrusRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArcticRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>{
  rules = {
    [RuleId.PlayAnimalCards]: PlayAnimalCardsRule,
    [RuleId.MoveAnimalTokens]: MoveAnimalTokensRule,
    [RuleId.DrawAnimalCards]: DrawAnimalCardsRule,
    [RuleId.Puffin]: PuffinRule,
    [RuleId.Bear]: BearRule,
    [RuleId.Walrus]: WalrusRule,
    [RuleId.DiscardCards]: DiscardCardsRule,
    [RuleId.Scoring]: ScoringRule
  }

  locationsStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.River]: new FillGapStrategy(),
      [LocationType.AnimalPile]: new PositiveSequenceStrategy(),
      [LocationType.PenaltyZone]: new PositiveSequenceStrategy()
    },
    [MaterialType.PowerCard]: {
      [LocationType.Powers]: new FillGapStrategy(),
      [LocationType.PowerPile]: new PositiveSequenceStrategy()
    },
    [MaterialType.TotemToken]: {
      [LocationType.LandscapeCard]: new FillGapStrategy()
    },
  }

  hidingStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.AnimalCardsDeck]: hideItemId,
      [LocationType.Reserve]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
      [LocationType.PenaltyZone]: hideItemIdToOthers
    },
    [MaterialType.TotemTile]: {
      [LocationType.PlayerTotem]: hideItemWhileNotRotated
    }
  }

  itemsCanMerge() {
    return false
  }

  giveTime(): number {
    return 60
  }

  getScore(playerId: PlayerId): number {
    return new ScoringHelper(this.game, playerId).score
  }

  protected moveRevealsSomething(move: MaterialMove): boolean {
    if (isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.AnimalPile) return false
    return super.moveRevealsSomething(move)
  }

}

export const hideItemWhileNotRotated = <P extends number = number, L extends number = number>(
  item: MaterialItem<P, L>, player?: P
): string[] => {
  if (!item.location.rotation) return hideItemIdToOthers(item, player)
  return []
}