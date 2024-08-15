import { MaterialRulesPart } from "@gamepark/rules-api";

export class ScoringRule extends MaterialRulesPart {
  onRuleStart() {
    return [this.endGame()]
  }
}