import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const topPileCard = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).sort(item => -item.location.x!).getItem()

    if (!topPileCard) {
      this.memorize<number>(Memory.DepositValue, 1)
    }
    else {
      const depositValue = 6 - ((topPileCard.id % 10))
      this.memorize<number>(Memory.DepositValue, depositValue)
    }

    return []
  }

  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.PlayerHand).player(this.player)
      .moveItems({ type: LocationType.AnimalPile, player: this.player })
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.AnimalPile) {
      this.memorize(Memory.DepositValue, value => value - 1)

      if (this.remind(Memory.DepositValue) === 0) {
        const animalId = Math.floor(this.material(MaterialType.AnimalCard).getItem(move.itemIndex)!.id / 100);
        const powerCard = this.material(MaterialType.PowerCard).id<PowerCard>(id => Math.floor(id / 10) === animalId)
        return [
          powerCard.moveItem({ type: LocationType.PowerPile, player: this.player }),
          this.rules().startRule(RuleId.MoveAnimalTokens)
        ]
      }
      if (!this.hand.length) {
        return [
          ...this
            .material(MaterialType.AnimalCard)
            .location(LocationType.AnimalCardsDeck)
            .deck()
            .limit(this.remind(Memory.DepositValue))
            .moveItems({
              type: LocationType.PenaltyZone,
              player: this.player
            }),

        this.rules().startRule(RuleId.MoveAnimalTokens)]
      }
    }

    return []
  }

  get hand() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }
}