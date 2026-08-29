import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const arcticAnimations = new MaterialGameAnimations()

arcticAnimations
  .configure((move, context) => isMoveItemType(MaterialType.AnimalCard)(move)
    && move.location.type === LocationType.River && context.rules.material(MaterialType.AnimalCard).getItem(move.itemIndex)!.location.type !== LocationType.PlayerHand
  )
.duration(500)
arcticAnimations
  .configure(and((move) =>  isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.PlayerHand, isMyMove()))
  .duration(600)

arcticAnimations
  .configure(and((move) =>  isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.AnimalPile, isMyMove()))
  .duration(600)

arcticAnimations
  .configure((move) =>  isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.PenaltyZone)
  .duration(600)

arcticAnimations
  .configure(isRule(RuleId.Scoring))
  .skip()