import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'
import isEqual from 'lodash/isEqual'

export class PuffinRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const playerState = new PlayerState(this.game, this.player)
    const moves: MaterialMove[] = []
    if (playerState.canGetVisibleCardInHand) {
      const topPileCard = playerState.animalPile.sort(item => -item.location.x!)
      if (topPileCard.length) {
        moves.push(
          topPileCard.moveItem({
            type: LocationType.PlayerHand,
            player: this.player
          })
        )
      }
    }

    if (playerState.canExchangeCardWithRiver) {
      const river = this.river
      for (const card of river.getItems()) {
        moves.push(
          ...playerState.hand.moveItems({
            ...card.location
          })
        )
      }
    }

    moves.push(
      this.startRule(RuleId.PlayAnimalCards)
    )

    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []
    const moves: MaterialMove[] = []
    const cardInRiver = this
      .river
      .filter((item) => isEqual(item.location, move.location))
    if (cardInRiver.length) {
      moves.push(
        cardInRiver.moveItem({
          type: LocationType.PlayerHand,
          player: this.player
        })
      )
    }

    if (move.location.type === LocationType.PlayerHand) {
      moves.push(
        this.startRule(RuleId.PlayAnimalCards)
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    this.refreshDepositValue()
    return []
  }

  refreshDepositValue() {
    const topPileCard = this
      .animalPile
      .deck()
      .getItem()

    if (!topPileCard || topPileCard.location.rotation) {
      this.memorize(Memory.DepositValue, 1)
    } else {
      const depositValue = 6 - ((topPileCard.id % 10))
      this.memorize(Memory.DepositValue, depositValue)
    }
  }

  get river() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.River)
  }

  get animalPile() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalPile)
      .player(this.player)
  }

}