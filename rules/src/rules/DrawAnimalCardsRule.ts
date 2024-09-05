import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
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
    this.memorize<number>(Memory.DrawValue, topPileCard?.location.rotation? 1: drawValue)
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const playerState = new PlayerState(this.game, this.player)
    if (playerState.canModifyDrawValue) {
      moves.push(
        this.customMove(CustomMoveType.ModifyValue, 1),
        this.customMove(CustomMoveType.ModifyValue, 0),
        this.customMove(CustomMoveType.ModifyValue, -1)
      )

      return moves
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

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ModifyValue)(move)) return []
    if (move.data) {
     this.memorize(Memory.DrawValue, (drawValue: number) => drawValue + move.data)
    }
    this.memorize(Memory.Modifier, move.data)
    if (!this.depositValue) return [this.startRule(RuleId.DiscardCards)]
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PlayerHand) return []

    this.memorize<number>(Memory.DrawValue, value => value - 1)
    const missingCards = 6 - this.river.length
    if (this.remind<number>(Memory.DrawValue) == 0) {
      return [
        ...this.dealCards(missingCards),
        this.startRule(RuleId.DiscardCards)
      ]
    } else if (this.isRiverRefillDirectly) {
      return this.dealCards(missingCards)
    }

    return []
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

  get depositValue() {
    return this.remind(Memory.DrawValue)
  }

  onRuleEnd() {
    this.forget(Memory.Modifier)
    return []
  }
}