import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DrawAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const pileCardsId = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).getItems().map(item => item.id)
    const drawValue = parseInt(pileCardsId[pileCardsId.length - 1].toString().slice(-1), 10)
    this.memorize('Draw value', drawValue, this.player)
    return []
  }

  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.River)
      .moveItems({ type: LocationType.PlayerHand, player: this.player })
  }

  afterItemMove(_move: ItemMove): MaterialMove[] {
    this.memorize('Draw value', this.remind('Draw value', this.player) - 1, this.player)
    if (this.remind('Draw value', this.player) == 0) {
      const missingCards = 6 - this.material(MaterialType.AnimalCard).location(LocationType.River).length

      return [
        ...this.material(MaterialType.AnimalCard).location(LocationType.AnimalCardsDeck).deck().deal({ type: LocationType.River }, missingCards),
        this.rules().startPlayerTurn(RuleId.PlayAnimalCards, this.nextPlayer)
      ]
    }
    return []
  }
}