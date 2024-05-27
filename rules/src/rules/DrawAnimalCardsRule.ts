import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DrawAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const topPileCard = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).sort(item => -item.location.x!).getItem()
    const drawValue = (topPileCard!.id % 10) + 1
    this.memorize<number>(Memory.DrawValue, drawValue)
    return []
  }

  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.River)
      .moveItems({ type: LocationType.PlayerHand, player: this.player })
  }

  afterItemMove(_move: ItemMove): MaterialMove[] {
    this.memorize<number>(Memory.DrawValue, value => value - 1)
    if (this.remind<number>(Memory.DrawValue) == 0) {
      const missingCards = 6 - this.material(MaterialType.AnimalCard).location(LocationType.River).length

      return [
        ...this.material(MaterialType.AnimalCard).location(LocationType.AnimalCardsDeck).deck().deal({ type: LocationType.River }, missingCards),
        this.rules().startPlayerTurn(RuleId.PlayAnimalCards, this.nextPlayer)
      ]
    }
    return []
  }
}