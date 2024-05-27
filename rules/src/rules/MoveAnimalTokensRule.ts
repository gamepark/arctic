import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { landscapes } from '../material/Landscape'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveAnimalTokensRule extends PlayerTurnRule {
    onRuleStart() {
        const topPileCard = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).sort(item => -item.location.x!).getItem()
        const animalsId = Math.floor(topPileCard!.id / 10)
        this.memorize<number>(Memory.MainAnimalId, Math.floor(animalsId / 10))
        this.memorize<number>(Memory.AssociatedAnimalId, Math.floor(animalsId % 10))
        const mainAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.MainAnimalId)).getItem()?.location.id)
        const associatedAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.AssociatedAnimalId)).getItem()?.location.id)

        if (mainAnimalIndex == 5 && associatedAnimalIndex == 5) {
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex - 1] })]
        }

        if (mainAnimalIndex == 0 && associatedAnimalIndex == 0) {
            this.memorize<number>("test", 10)
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex + 1] })]
        }

        if (mainAnimalIndex == 5) {
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.AssociatedAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[associatedAnimalIndex + 1] })]
        }

        if (mainAnimalIndex == 0) {
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex + 1] })]
        }

        if (associatedAnimalIndex == 5) {
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex + 1] })]
        }

        if (associatedAnimalIndex == 0) {
            return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.AssociatedAnimalId))
                .moveItems({ type: LocationType.LandscapeCard, id: landscapes[associatedAnimalIndex + 1] })]
        }
        return []
    }

    getPlayerMoves() {
        const mainAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.MainAnimalId)).getItem()?.location.id)
        const associatedAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.AssociatedAnimalId)).getItem()?.location.id)

        return [...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
            .moveItems({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex + 1] }),
        ...this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.AssociatedAnimalId))
            .moveItems({ type: LocationType.LandscapeCard, id: landscapes[associatedAnimalIndex + 1] }),
        ]
    }

    afterItemMove(move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
        if (isMoveItemType(MaterialType.TotemToken)(move)) {
            if (this.remind<number>("test") != 10) {
                this.memorize<number>("test", this.material(MaterialType.TotemToken).getItem(move.itemIndex)?.id)
            }
        }
        return [this.rules().startRule(RuleId.DrawAnimalCards)]
    }

    onRuleEnd<RuleId extends number>(_move: RuleMove<number, RuleId>): MaterialMove<number, number, number>[] {
        const mainAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.MainAnimalId)).getItem()?.location.id)
        const associatedAnimalIndex = landscapes.indexOf(this.material(MaterialType.TotemToken).id(this.remind<number>(Memory.AssociatedAnimalId)).getItem()?.location.id)
        if (this.remind<number>("test") == 10) {
            return [this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.AssociatedAnimalId))
                .moveItem({ type: LocationType.LandscapeCard, id: landscapes[associatedAnimalIndex + 1] })]
        }
        if (this.remind<number>("test") == this.remind<number>(Memory.MainAnimalId)) {
            return [this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.AssociatedAnimalId))
                .moveItem({ type: LocationType.LandscapeCard, id: landscapes[associatedAnimalIndex - 1] })]
        }
        else {
            return [this.material(MaterialType.TotemToken).location(LocationType.LandscapeCard).id(this.remind<number>(Memory.MainAnimalId))
                .moveItem({ type: LocationType.LandscapeCard, id: landscapes[mainAnimalIndex - 1] })]
        }
    }
}