import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId';

export class PlayAnimalCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.material(MaterialType.AnimalCard).location(LocationType.PlayerHand).player(this.player)
      .moveItems({ type: LocationType.AnimalPile, player: this.player })
  }

  onRuleStart() {
    if (this.remind('Value deposit', this.player) === undefined) {
      this.memorize('Value deposit', 1, this.player);
    }
    else {
      const pileCardsId = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).getItems().map(item => item.id)
      const depositValue = 6 - parseInt(pileCardsId[pileCardsId.length - 1].toString().slice(-1), 10)
      this.memorize('Value deposit', depositValue, this.player)
    }

    return []
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

    this.memorize('Value deposit', this.remind('Value deposit', this.player) - 1, this.player);

    if (this.remind('Value deposit', this.player) == 0) {
      return [this.rules().startRule(RuleId.DrawAnimalCards)];
    }

    return []
  }
}