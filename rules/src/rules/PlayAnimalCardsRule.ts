import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const topPileCard = this.animalPile.sort(item => -item.location.x!).getItem()


    if (!topPileCard) {
      this.memorize<number>(Memory.DepositValue, 1)
    } else {
      const depositValue = 6 - ((topPileCard.id % 10))
      this.memorize<number>(Memory.DepositValue, depositValue)
    }

    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const hand = this.hand

    moves.push(
      ...hand.moveItems({ type: LocationType.AnimalPile, player: this.player })
    )

    if (this.canGetVisibleCardInHand) {
      const topPileCard = this.animalPile.sort(item => -item.location.x!)
      if (topPileCard.length) {
        moves.push(
          topPileCard.moveItem({
            type: LocationType.PlayerHand,
            player: this.player
          })
        )
      }
    }

    if (this.canExchangeCardWithRiver) {
      const river = this.river
      for (const card of river.getItems()) {
        moves.push(
          ...hand.moveItems({
            ...card.location
          })
        )
      }
    }

    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []
    const moves: MaterialMove[] = []
    const cardInRiver = this.river.filter((item) => isEqual(item.location, move.location))
    if (cardInRiver.length) {
      moves.push(
        cardInRiver.moveItem({
          type: LocationType.PlayerHand,
          player: this.player
        })
      )
    }

    if (move.location.type === LocationType.PlayerHand) {
      this.memorize(Memory.PuffinUsed, true)
    }

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.AnimalPile) return []
    this.memorize(Memory.DepositValue, value => value - 1)

    if (this.remind(Memory.DepositValue) === 0) {
      const animalId = Math.floor(this.material(MaterialType.AnimalCard).getItem(move.itemIndex)!.id / 100)
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
        this.rules().startRule(RuleId.MoveAnimalTokens)
      ]
    }

    return []
  }

  get canExchangeCardWithRiver() {
    if (!this.hand.length || this.hasPlacedCard || this.remind(Memory.PuffinUsed)) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin1)
  }

  get canGetVisibleCardInHand() {
    if (!this.animalPile.length || this.hasPlacedCard || this.remind(Memory.PuffinUsed)) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin2)
  }

  get hasPlacedCard() {
    return this.remind(Memory.HasPlacedCard)
  }

  get hand() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }

  get animalPile() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalPile)
      .player(this.player)
  }

  get river() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.River)
  }

  onRuleEnd() {
    this.forget(Memory.HasPlacedCard)
    this.forget(Memory.PuffinUsed)
    return []
  }
}