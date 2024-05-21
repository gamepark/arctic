import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class PlayAnimalCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.PlayerHand).player(this.player)
      .moveItems({ type: LocationType.AnimalPile, player: this.player })
  }
  afterItemMove(move: ItemMove): MaterialMove[] {
    const powerCardsIds = this.material(MaterialType.PowerCard).getItems().map(item => item.id);

    if (isMoveItemType(MaterialType.AnimalCard)(move)) {
      const animalId = Math.floor(this.material(MaterialType.AnimalCard).getItem(move.itemIndex)?.id / 100);

      if (animalId !== undefined) {
        const powerCardId = powerCardsIds.find(power => power.toString().startsWith(animalId.toString()));

        if (powerCardId !== undefined) {
          return this.material(MaterialType.PowerCard).id(powerCardId)
            .moveItems({ type: LocationType.PowerPile, player: this.player });
        }
      }
    }
    return [];
  }
}