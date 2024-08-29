import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const arcticAnimations = new MaterialGameAnimations()

arcticAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move)
    && move.location.type === LocationType.River && context.rules.material(MaterialType.AnimalCard).getItem(move.itemIndex)!.location.type !== LocationType.PlayerHand
  )
.duration(0.5)
arcticAnimations
  .when()
  .move((move) =>  isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.PlayerHand)
  .duration(0.6)

arcticAnimations
  .when()
  .move((move) =>  isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.AnimalPile)
  .duration(0.6)

arcticAnimations
  .when()
  .rule(RuleId.Scoring)
  .duration(0)