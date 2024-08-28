import { MaterialGame, MaterialItem, MaterialRulesPart, Location } from '@gamepark/rules-api'
import { Animal } from '../../material/Animal'
import { getAnimalFromCard } from '../../material/AnimalCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { PlayerState } from '../PlayerState'
import last from 'lodash/last'
import sum from 'lodash/sum'

export class ScoringHelper extends MaterialRulesPart {
  private playerState: PlayerState
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.playerState = new PlayerState(game, player)
  }

  get score() {
    return this.pileScore - this.penalties + this.forestScore + this.differentAnimals
  }

  get pileScore() {
    return sum(this.groups.map((group, groupIndex) => this.getGroupScore(groupIndex, getAnimalFromCard(group[0].id), group.length))) ?? 0
  }

  get differentAnimals() {
    const validGroups = this.groups.filter((group, groupIndex) => this.getGroupScore(groupIndex, getAnimalFromCard(group[0].id), group.length) > 0)
    return [0, 0, 1, 3, 6, 10, 15][validGroups.length]
  }

  getGroup(location: Location) {
    const index = this.getGroupIndex(location)
    return this.groups[index]
  }

  getGroupIndex(location: Location) {
    return this.groups.findIndex((items) => items.some((item) => item.location.x === location.x))

  }

  get groups() {
    const cards: MaterialItem[][] = []
    for (const card of this.animalPile.getItems()) {
      if (!cards.length) {
        cards.push([card])
      } else {
        const lastGroup = last(cards) ?? []
        if (getAnimalFromCard(card.id) === getAnimalFromCard(last(lastGroup)!.id)) {
          lastGroup.push(card)
        } else {
          cards.push([card])
        }
      }
    }

    return cards
  }

  getGroupScore(groupIndex: number, animalId: Animal, size: number) {
    const otherPreviousGroupOrGreaterThan = this.groups.find(
      (group, index) => (
        ((index < groupIndex && group.length >= size) || group.length > size) &&
        (group.some((item) => getAnimalFromCard(item.id) === animalId))
      )
    )
    if (otherPreviousGroupOrGreaterThan) return 0
    if (size >= 6) return 15
    return [0, 0, 1, 3, 6, 10][size]
  }

  get animalPile() {
    return this.playerState.animalPile.sort((item) => item.location.x!)
  }

  get penalties() {
    return this.material(MaterialType.AnimalCard)
      .location(LocationType.PenaltyZone)
      .player(this.player)
      .length
  }

  get forestScore() {
    const myAnimalTokenId = this.myAnimalTokenId
    return this
      .material(MaterialType.TotemToken)
      .id((id) => id === myAnimalTokenId)
      .getItem()!.location.id

  }

  get myAnimalTokenId() {
    return this
      .material(MaterialType.TotemTile)
      .player(this.player)
      .getItem()!.id

  }
}