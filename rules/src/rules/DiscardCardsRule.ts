import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class DiscardCardsRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.hand.length <= 7) return [this.goToNextPlayer()]
    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return this.hand.moveItems({
      type: LocationType.PenaltyZone,
      player: this.player
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PenaltyZone) return []
    if (this.hand.length <= 7) return [this.goToNextPlayer()]
    return []
  }

  get hand() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }

  goToNextPlayer() {
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0] && !this.reserve.length) {
      this.memorize(Memory.LastRound, true)
    }

    const effectHelper = new PlayerState(this.game, nextPlayer)
    return this.startPlayerTurn(effectHelper.hasPuffin? RuleId.Puffin: RuleId.PlayAnimalCards, this.nextPlayer)
  }

  get reserve() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.Reserve)
  }
}