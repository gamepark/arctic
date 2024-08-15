import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { landscapes } from '../../material/Landscape'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { PlayerState } from '../PlayerState'

export class AnimalTokensHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get animalTokens() {
    const topPileCard = new PlayerState(this.game, this.player).topPileCard
    const animalsId = Math.floor(topPileCard!.id / 10)
    const mainAnimalId = Math.floor(animalsId / 10)
    const mainToken = this.material(MaterialType.TotemToken).id(mainAnimalId)
    const mainLandscapeIndex = landscapes.indexOf(mainToken.getItem()?.location.id)
    const associatedAnimalId = Math.floor(animalsId % 10)
    const associatedToken = this.material(MaterialType.TotemToken).id(associatedAnimalId)
    const associatedLandscapeIndex = landscapes.indexOf(associatedToken.getItem()?.location.id)

    return {
      mainLandscapeIndex,
      mainToken,
      mainAnimalId,
      associatedLandscapeIndex,
      associatedToken,
      associatedAnimalId
    }
  }
}