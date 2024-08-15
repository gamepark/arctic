import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class BearRule extends PlayerTurnRule {
  onRuleStart() {
    const penalties = new PlayerState(this.game, this.player).penalties
    if (!penalties.length) return [this.startRule(RuleId.DrawAnimalCards)]
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const penalty = new PlayerState(this.game, this.player).penalties.maxBy((item) => item.location.x!)
    for (const player of this.game.players) {
      if (player === this.player) continue
      moves.push(
        penalty.moveItem(({
          type: LocationType.PenaltyZone,
          player: player
        }))
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.AnimalCard)(move) || move.location.type !== LocationType.PenaltyZone) return []
    return [this.startRule(RuleId.DrawAnimalCards)]
  }
}