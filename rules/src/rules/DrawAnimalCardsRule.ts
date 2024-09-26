import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getDrawValue } from '../material/AnimalCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class DrawAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const playerState = new PlayerState(this.game, this.player)
    const topPileCard = playerState.topPileCard
    const drawValue = getDrawValue(topPileCard!.id)
    this.memorize<number>(Memory.DrawValue, topPileCard?.location.rotation ? 1 : drawValue)
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const playerState = new PlayerState(this.game, this.player)
    if (playerState.canModifyDrawValue && playerState.drawValue <= 2) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

    if (playerState.canDrawFromPenaltyCards) {
      moves.push(
        ...playerState.penalties.moveItems({
          type: LocationType.PlayerHand,
          player: this.player
        })
      )

    }

    moves.push(
      ...this.river.moveItems({
        type: LocationType.PlayerHand,
        player: this.player
      })
    )

    if (playerState.canTakeCardsOnDeck) {
      moves.push(
        this
          .deck
          .moveItem({
            type: LocationType.PlayerHand,
            player: this.player
          })
      )
    }

    return moves
  }

  onCustomMove() {
    return this.goToNextRule()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PlayerHand) return []

    this.memorize<number>(Memory.DrawValue, value => value - 1)
    const playerState = new PlayerState(this.game, this.player)
    if (!playerState.drawValue) {
      this.forget(Memory.DrawValue)
      return this.goToNextRule()
    } else if (this.isRiverRefillDirectly) {
      return this.refillRiver()
    }

    return []
  }

  goToNextRule() {
    return [
      ...this.refillRiver(),
      this.startRule(RuleId.DiscardCards)
    ]
  }

  refillRiver() {
    const missingCards = 6 - this.river.length
    return this.dealCards(missingCards)
  }

  dealCards(count: number = 1): MaterialMove[] {
    const playerState = new PlayerState(this.game, this.player)
    const deck = playerState.deck
    const diff = count - deck.length
    if (deck.length < count) {
      const reserve = this.material(MaterialType.AnimalCard).location(LocationType.Reserve)
      return [
        ...deck.deal({ type: LocationType.River }, deck.length),
        reserve.moveItemsAtOnce({ type: LocationType.AnimalCardsDeck }),
        ...reserve.deck().deal({ type: LocationType.River }, diff)
      ]
    }

    return deck
      .deal({ type: LocationType.River }, count)
  }

  get river() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.River)
  }

  get deck() {
    return new PlayerState(this.game, this.player).deck
  }

  get isRiverRefillDirectly() {
    if (!this.deck.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Orca1).length > 0
  }

  giveTime() {
    return 0
  }
}