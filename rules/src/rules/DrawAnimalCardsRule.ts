import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class DrawAnimalCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.River)
      .moveItems({ type: LocationType.PlayerHand, player: this.player })
  }
}