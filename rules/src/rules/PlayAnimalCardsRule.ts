import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getAnimalFromCard, getDepositValue } from '../material/AnimalCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class PlayAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    this.refreshDepositValue()

    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const hand = this.hand

    const playerState = new PlayerState(this.game, this.player)
    if (playerState.canModifyPlayValue && playerState.depositValue <= 2) {
      moves.push(this.startRule(RuleId.DiscardCards))
    }

    const animalPile = this.animalPile.length
    if (animalPile && playerState.canPlaceCardUnderAnimalPile) {
      moves.push(
        ...hand.moveItems({ type: LocationType.AnimalPile, player: this.player, x: 0 })
      )
    } else if (animalPile && playerState.canPlaceCardUnderLastAnimalInPile) {
      moves.push(
        ...hand.moveItems({ type: LocationType.AnimalPile, player: this.player, x: animalPile - 1, rotation: true })
      )
    }

    moves.push(
      ...hand.moveItems({ type: LocationType.AnimalPile, player: this.player })
    )

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []

    const moves: MaterialMove[] = []
    if (move.location.type === LocationType.AnimalPile || move.location.type === LocationType.PenaltyZone) {
      const playerState = new PlayerState(this.game, this.player)

      this.memorize(Memory.DepositValue, (value: number) => value - 1)
      const depositValue = playerState.depositValue
      if (depositValue === 0) {
        moves.push(...this.movePowerCard())
        moves.push(this.startRule(RuleId.MoveAnimalTokens))
        return moves
      }

      if (move.location.type === LocationType.AnimalPile) {
        if (!this.hand.length) {
          moves.push(
            ...this
              .material(MaterialType.AnimalCard)
              .location(LocationType.AnimalCardsDeck)
              .deck()
              .limit(depositValue)
              .moveItems({
                type: LocationType.PenaltyZone,
                player: this.player
              })
          )
        }
      }
    }

    if (move.location.type === LocationType.PlayerHand) {
      this.refreshDepositValue()
    }

    return moves
  }

  movePowerCard(): MaterialMove[] {
    //if (move.location.x === undefined) return []
    const playerState = new PlayerState(this.game, this.player)
    const topCard = playerState.topPileCard!
    const animalId = getAnimalFromCard(topCard.id)
    const powerCard = this.material(MaterialType.PowerCard).id((id: PowerCard) => Math.floor(id / 10) === animalId)
    if (powerCard.getItem()?.location.player === this.player) return []
    return powerCard.moveItems({ type: LocationType.PowerPile, player: this.player })
  }

  refreshDepositValue() {
    const topPileCard = this.animalPile.sort(item => -item.location.x!).getItem()

    if (!topPileCard || topPileCard.location.rotation) {
      this.memorize(Memory.DepositValue, 1)
    } else {
      const depositValue = getDepositValue(topPileCard.id)
      this.memorize(Memory.DepositValue, depositValue)
    }
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

  onRuleEnd() {
    this.forget(Memory.HasPlacedCard)
    this.forget(Memory.DepositValue)
    return []
  }
}