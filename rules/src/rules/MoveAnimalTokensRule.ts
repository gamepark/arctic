import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { landscapes } from '../material/Landscape'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PowerCard } from '../material/PowerCard'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveAnimalTokensRule extends PlayerTurnRule {
  onRuleStart() {
    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animals

    console.log(mainLandscapeIndex, associatedLandscapeIndex)
    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 5) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        })
      ]
    }

    if (mainLandscapeIndex === 0 && associatedLandscapeIndex === 0) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        })
      ]
    }

    if (mainLandscapeIndex === 5) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        })
      ]
    }

    if (mainLandscapeIndex === 0) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        })
      ]
    }

    if (associatedLandscapeIndex === 5) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex - 1]
        })
      ]
    }

    if (associatedLandscapeIndex === 0) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex + 1]
        })
      ]
    }
    return []
  }

  getPlayerMoves() {

    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animals
    return [
      mainToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex + 1]
        }),
      associatedToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex + 1]
        })
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.TotemToken)(move)) return []
    if (this.remind(Memory.TokensMoved)) return [this.rules().startRule(RuleId.DrawAnimalCards)]

    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animals
    const moves: MaterialMove[] = this.associatedAnimalAutomaticMove

    if (!moves.length) {
      if (move.itemIndex === mainToken.getIndex()) {
        moves.push(
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[associatedLandscapeIndex - 1]
          })
        )
      } else {
        moves.push(
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[mainLandscapeIndex - 1]
          })
        )
      }
    }

    this.memorize(Memory.TokensMoved, true)
    return moves
  }

  get animals() {
    const topPileCard = this.material(MaterialType.AnimalCard).location(LocationType.AnimalPile).player(this.player).sort(item => -item.location.x!).getItem()
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

  get associatedAnimalAutomaticMove() {
    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animals
    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 5) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        })
      ]
    }

    if (mainLandscapeIndex === 0 && associatedLandscapeIndex === 0) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        })
      ]
    }

    if (mainLandscapeIndex === 5) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex + 1]
        })
      ]
    }

    if (mainLandscapeIndex === 0) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex - 1]
        })
      ]
    }

    if (associatedLandscapeIndex === 5) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex + 1]
        })
      ]
    }

    if (associatedLandscapeIndex === 0) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex - 1]
        })
      ]
    }

    return []
  }

  onRuleEnd() {
    this.forget(Memory.TokensMoved)
    return []
  }

  get canMoveTokenOnceMore() {
    return !this.remind(Memory.WalrusUsed)
      && (this.canMoveAssociatedAnimalTokenOnceMore || this.canMoveMainAnimalTokenOnceMore)
  }

  get canMoveMainAnimalTokenOnceMore() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Walrus1)
      .length > 0
  }

  get canMoveAssociatedAnimalTokenOnceMore() {
    return this
      .material(MaterialType.PowerCard)
      .location(LocationType.PowerPile)
      .player(this.player)
      .id((id: PowerCard) => id === PowerCard.Walrus1)
      .length > 0
  }
}