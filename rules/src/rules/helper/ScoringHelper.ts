import { Location, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import last from 'lodash/last'
import max from 'lodash/max'
import maxBy from 'lodash/maxBy'
import sum from 'lodash/sum'
import { Animal, animals } from '../../material/Animal'
import { getAnimalFromCard } from '../../material/AnimalCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { Memory } from '../Memory'
import { PlayerState } from '../PlayerState'

type Groups = { item: MaterialItem, index: number }[][]
type GroupWithScore = { score: number, groups: Groups}
export class ScoringHelper extends MaterialRulesPart {
  private playerState: PlayerState
  public optimalGroupAndScore: GroupWithScore

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.playerState = new PlayerState(game, player)
    this.optimalGroupAndScore = this.computeGroupWithScore()
  }

  get score() {
    return this.pileScore - this.penalties + this.forestScore + this.differentAnimals
  }

  get pileScore() {
    return this.optimalGroupAndScore.score
  }

  getAnimalScore(animal: Animal) {
    return getAnimalScore(animal, this.optimalGroupAndScore.groups)
  }

  get differentAnimals() {
    const validGroups = this.optimalGroupAndScore.groups.filter((group, groupIndex) => this.getGroupScore(groupIndex, getAnimalFromCard(group[0].item.id), group.length) > 0)
    return [0, 0, 1, 3, 6, 10, 15][validGroups.length]
  }

  getGroup(location: Location) {
    const groups = this.optimalGroupAndScore.groups
    const index = this.getGroupIndex(groups, location)
    return groups[index]
  }

  getGroupIndex(groups: Groups, location: Location) {
    return groups.findIndex((items) => items.some((item) => item.item.location.x === location.x))
  }

  computeGroupWithScore(): GroupWithScore {
    const cards: { item: MaterialItem, index: number }[][] = []
    for (const index of this.animalPile.getIndexes()) {
      const card = this.animalPile.getItem(index)!
      if (!cards.length) {
        cards.push([{ item: card, index }])
      } else {
        const lastGroup = last(cards) ?? []
        if (card.id === undefined) {
          if (last(lastGroup)!.item.id === undefined) {
            lastGroup.push({ item: card, index })
          } else {
            cards.push([{ item: card, index }])
          }
        } else {
          if (getAnimalFromCard(card.id) === getAnimalFromCard(last(lastGroup)!.item.id)) {
            lastGroup.push({ item: card, index })
          } else {
            cards.push([{ item: card, index }])
          }
        }
      }
    }

    return this.getOptimalGroups(cards)
  }

  getOptimalGroups(groups: Groups): GroupWithScore {
    for (let index= 0; index < groups.length; index++) {
      const items = groups[index]
      if (items.every((item) => item.item.location.rotation)) {
        let leftOptimalGroup = undefined
        let rightOptimalGroup = undefined

        if (index > 0) {
          const leftBranch = groups.slice(0, index).concat(groups.slice(index + 1))
          leftBranch[index - 1] = [...leftBranch[index - 1], ...items]
          leftOptimalGroup = this.getOptimalGroups(leftBranch)
        }

        if (index < (groups.length - 1)) {
          const rightBranch = groups.slice(0, index).concat(groups.slice(index + 1))
          rightBranch[index] = [...items, ...rightBranch[index]]
          rightOptimalGroup = this.getOptimalGroups(rightBranch)
        }

        if (leftOptimalGroup && rightOptimalGroup) {
          return maxBy([leftOptimalGroup, rightOptimalGroup], group => group.score)!
        }

        if (leftOptimalGroup) return leftOptimalGroup
        if (rightOptimalGroup) return rightOptimalGroup
      }
    }
    return {
      score: sum(animals.map((animal) => getAnimalScore(animal, groups))) ?? 0,
      groups
    }
  }

  getAnimalGroups(groups: Groups, animal: Animal) {
    return groups
      .filter((group) => group.some((item) => getAnimalFromCard(item.item.id) === animal))
  }

  getGroupScore(groupIndex: number, animalId: Animal, size: number) {
    return getGroupScore(groupIndex, animalId, size, this.optimalGroupAndScore.groups)
  }

  get animalPile() {
    return this.playerState.animalPile.sort((item) => item.location.x!)
  }

  get penalties() {
    return this.material(MaterialType.AnimalCard)
      .location(LocationType.PenaltyZone)
      .player(this.player)
      .length
    + (this.remind(Memory.ExtraPenalties, this.player) ?? 0)
  }

  get forestScore() {
    const myAnimalTokenId = this.myAnimalTokenId
    const token = this
      .material(MaterialType.TotemToken)
      .id((id) => id === myAnimalTokenId)

    if (!token.length) return 0
    return token.getItem()!.location.id

  }

  get myAnimalTokenId() {
    return this
      .material(MaterialType.TotemTile)
      .player(this.player)
      .getItem()!.id

  }
}

const getGroupScore = (groupIndex: number, animalId: Animal, size: number, groups: Groups) => {
  const otherPreviousGroupOrGreaterThan = groups.find(
    (group, index) => (
      ((index < groupIndex && group.length >= size) || group.length > size) &&
      (group.some((item) => getAnimalFromCard(item.item.id) === animalId))
    )
  )
  if (otherPreviousGroupOrGreaterThan) return 0
  if (size >= 6) return 15
  return [0, 0, 1, 3, 6, 10][size]
}

const getAnimalScore = (animal: Animal, groups: Groups) => {
  return max(
    getAnimalGroups(groups, animal)
      .map((group, groupIndex) => getGroupScore(groupIndex, animal, group.length, groups))
  ) ?? 0
}

const getAnimalGroups = (groups: Groups, animal: Animal) => {
  return groups
    .filter((group) => group.some((item) => getAnimalFromCard(item.item.id) === animal))
}