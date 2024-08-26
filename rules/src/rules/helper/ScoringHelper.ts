import { MaterialGame, MaterialItem, MaterialRulesPart, Location } from '@gamepark/rules-api'
import { getAnimalFromCard } from '../../material/AnimalCard'
import { PlayerId } from '../../PlayerId'
import { PlayerState } from '../PlayerState'
import last from 'lodash/last'

export class ScoringHelper extends MaterialRulesPart {
  private playerState: PlayerState
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.playerState = new PlayerState(game, player)
  }

  get score() {
    return 0
  }

  getGroup(location: Location) {
    const index = this.getGroupIndex(location)
    return this.getGroups()[index]
  }

  getGroupIndex(location: Location) {
    console.log(this.getGroups())
    return this.getGroups().findIndex((items) => items.some((item) => item.location.x === location.x))

  }

  getGroups() {
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

  get animalPile() {
    return this.playerState.animalPile.sort((item) => item.location.x!)
  }
}