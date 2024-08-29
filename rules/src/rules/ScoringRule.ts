import { MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from '../material/MaterialType'

export class ScoringRule extends MaterialRulesPart {
  onRuleStart() {
    return [
      ...this.material(MaterialType.TotemTile).rotateItems(true),
      this.endGame()
    ]
  }
}