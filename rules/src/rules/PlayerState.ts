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

  get canExchangeCardWithRiver() {
    if (!this.hand.length || this.remind(Memory.PuffinUsed)) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin1).length > 0
  }

  get canGetVisibleCardInHand() {
    if (!this.animalPile.length || this.remind(Memory.PuffinUsed)) return false
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