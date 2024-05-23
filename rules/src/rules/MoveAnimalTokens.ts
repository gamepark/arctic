import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Landscape } from '../material/Landscape'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class MoveAnimalTokens extends PlayerTurnRule {

    getPlayerMoves() {
        return this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard)
            .moveItems({ type: LocationType.LandscapeCard, id: Landscape.Landscape10 })
    }

    afterItemMove(_move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
        return [this.rules().startRule(RuleId.DrawAnimalCards)]
    }
}