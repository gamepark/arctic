import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DrawAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    const topPileCard = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).sort(item => -item.location.x!).getItem()
    const drawValue = (topPileCard!.id % 10)
    this.memorize<number>(Memory.DrawValue, drawValue)
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    if (this.canModifyValue) {
      moves.push(
        this.customMove(CustomMoveType.ModifyValue, 1),
        this.customMove(CustomMoveType.ModifyValue, -1),
      )
    }

    moves.push(
      ...this.river.moveItems({
        type: LocationType.PlayerHand,
        player: this.player
      })
    )

    if (this.canTakeCardsOnDeck) {
      moves.push(
        ...this.deck.moveItems({
          type: LocationType.PlayerHand,
          player: this.player
        })
      )
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ModifyValue)(move)) return []
    this.memorize(Memory.DepositValue, (depositValue) => depositValue + move.data)
    this.memorize(Memory.Modifier, move.data)
    if (!this.depositValue) return [this.rules().startPlayerTurn(RuleId.PlayAnimalCards, this.nextPlayer)]
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    const isRefillDirectly = this.isRiverRefillDirectly

    this.memorize<number>(Memory.DrawValue, value => value - 1)
    if (this.remind<number>(Memory.DrawValue) == 0) {
      const missingCards = 6 - this.material(MaterialType.AnimalCard).location(LocationType.River).length
      return [
        ...this.dealCards(missingCards),
        this.rules().startPlayerTurn(RuleId.PlayAnimalCards, this.nextPlayer)
      ]
    } else {
      if (isRefillDirectly) {
        return this.dealCards()
      }
    }

    return []
  }

  dealCards(count: number = 1): MaterialMove[] {
    return this
      .deck
      .deal({ type: LocationType.River }, count)
  }

  get deck() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .deck()
  }

  get river() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.River)
  }

  get canTakeCardsOnDeck() {
    if (!this.deck.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Orca2).length > 0
  }

  get isRiverRefillDirectly() {
    if (!this.deck.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Orca1).length > 0
  }

  get canModifyValue() {
    if (this.remind(Memory.Modifier) !== undefined) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Moose2).length > 0
  }

  get depositValue() {
    return this.remind(Memory.DepositValue)
  }

  onRuleEnd() {
    this.forget(Memory.Modifier)
    return []
  }
}