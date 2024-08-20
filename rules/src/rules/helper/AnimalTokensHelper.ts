import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { getAnimalFromCard, getAssociatedAnimalFromCard } from '../../material/AnimalCard'
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
    const mainAnimalId = getAnimalFromCard(topPileCard!.id)
    const mainToken = this.material(MaterialType.TotemToken).id(mainAnimalId)
    const mainLandscapeIndex = landscapes.indexOf(mainToken.getItem()?.location.id)
    const associatedAnimalId = getAssociatedAnimalFromCard(topPileCard!.id)
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