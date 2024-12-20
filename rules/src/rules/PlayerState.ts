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
      .getItem()
  }

  get depositValue() {
    const depositValue = this.remind(Memory.DepositValue) ?? 0
    if (this.canModifyPlayValue) return depositValue + 1
    return depositValue
  }

  get canPlaceCardUnderAnimalPile() {
    if (this.canModifyPlayValue && this.depositValue === 2 && this.fox?.id === PowerCard.Fox1) return true
    return this.depositValue === 1 && this.fox?.id === PowerCard.Fox1
  }

  get canPlaceCardUnderLastAnimalInPile() {
    if (!!this.animalPile.maxBy((item) => item.location.x!).getItem()?.location.rotation) return false
    if (this.canModifyPlayValue && this.depositValue === 2 && this.fox?.id === PowerCard.Fox2) return true
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
    if (!!this.animalPile.maxBy((item) => item.location.x!).getItem()?.location.rotation) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Puffin2).length > 0
  }

  get canGivePenaltyCard() {
    if (!this.penalties.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Bear1).length > 0
  }

  get canDrawFromPenaltyCards() {
    if (!this.penalties.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Bear2).length > 0
  }

  get penalties() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PenaltyZone)
      .player(this.player)
      .deck()
  }

  get hand() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }

  get canModifyDrawValue() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Moose1).length > 0
  }

  get canModifyPlayValue() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Moose2).length > 0
  }

  get canTakeCardsOnDeck() {
    if (!this.deck.length) return false
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Orca2).length > 0
  }

  get canMoveTokenOnceMore() {
    return !this.remind(Memory.WalrusUsed)
      && (this.canMoveAssociatedAnimalTokenOnceMore || this.canMoveMainAnimalTokenOnceMore)
  }

  get canMoveMainAnimalTokenOnceMore() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Walrus1)
      .length > 0
  }

  get canMoveAssociatedAnimalTokenOnceMore() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Walrus2)
      .length > 0
  }

  get deck() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalCardsDeck)
      .deck()
  }

  get topPileCard() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalPile)
      .player(this.player)
      .maxBy(item => item.location.x!)
      .getItem()
  }

  get animalPile() {
    return this
      .material(MaterialType.AnimalCard)
      .location(LocationType.AnimalPile)
      .player(this.player)
  }

  get drawValue() {
    const drawValue = this.remind(Memory.DrawValue) ?? 0
    if (this.canModifyDrawValue) return drawValue + 1
    return drawValue
  }

  get isLastCardHidden() {
    return this.animalPile.maxBy((item) => item.location.x!).getItem()?.location.rotation
  }
}