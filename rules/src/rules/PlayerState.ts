import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { PlayerId } from '../PlayerId'
import { Memory } from './Memory'

export class PlayerState extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get hasPuffin() {
    return this.canExchangeCardWithRiver || this.canGetVisibleCardInHand
  }

  get fox() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Fox1 || id === PowerCard.Fox2)
      .getItem()!
  }

  get depositValue() {
    return this.remind(Memory.DepositValue)
  }

  get canPlaceCardUnderAnimalPile() {
    return this.depositValue === 1 && this.fox?.id === PowerCard.Fox1
  }

  get canPlaceCardUnderLastAnimalInPile() {
    return this.depositValue === 1 && this.fox?.id === PowerCard.Fox2
  }

  get canExchangeCardWithRiver() {
    if (!this.hand.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin1).length > 0
  }

  get canGetVisibleCardInHand() {
    if (!this.animalPile.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin2).length > 0
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
}