import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getAnimalFromCard, getDepositValue } from '../material/AnimalCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class PlayAnimalCardsRule extends PlayerTurnRule {
  onRuleStart() {
    this.computeDepositValue()
    return this.handleEmptyHand()
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const hand = this.hand

    const playerState = new PlayerState(this.game, this.player)
    if (playerState.canModifyPlayValue) {
      if (!this.isLastCardHidden && playerState.depositValue <= 2) {
        moves.push(this.customMove(CustomMoveType.Pass))
      }
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

  get isLastCardHidden() {
    return this.animalPile.maxBy((item) => item.location.x!).getItem()?.location.rotation
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []

    if (move.location.type === LocationType.AnimalPile) {
      const playerState = new PlayerState(this.game, this.player)

      this.memorize(Memory.DepositValue, (value: number) => value - 1)
      const depositValue = playerState.depositValue
      if (depositValue === 0) {
        return this.endRuleMoves
      }

      return this.handleEmptyHand()
    }

    return []
  }

  handleEmptyHand() {
    const playerState = new PlayerState(this.game, this.player)
    const depositValue = playerState.depositValue
    if (!this.hand.length) {
      const penalties = playerState.canModifyPlayValue ? depositValue - 2 : depositValue
      if (penalties <= 0) {
        return this.endRuleMoves
      } else {
        const deck = this
          .material(MaterialType.AnimalCard)
          .location(LocationType.AnimalCardsDeck)
          .deck()
        if (deck.length < penalties) {
          this.memorize(Memory.ExtraPenalties, value => (value ?? 0) + penalties - deck.length, this.player)
        }
        return [
          ...deck
            .limit(penalties)
            .moveItems({
              type: LocationType.PenaltyZone,
              player: this.player
            }),
          ...this.endRuleMoves
        ]
      }
    }

    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.endRuleMoves
    }
    return []
  }

  get endRuleMoves() {
    return this.movePowerCard().concat(this.startRule(RuleId.MoveAnimalTokens))
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

  computeDepositValue() {
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