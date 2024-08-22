import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { landscapes } from '../material/Landscape'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AnimalTokensHelper } from './helper/AnimalTokensHelper'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class WalrusRule extends PlayerTurnRule {

  getPlayerMoves() {
    console.log("???")
    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animalsTokens
    const playerState = new PlayerState(this.game, this.player)
    const canMoveMainAnimalTokenOnceMore = playerState.canMoveMainAnimalTokenOnceMore
    const token = canMoveMainAnimalTokenOnceMore ? mainToken : associatedToken
    const landscapeIndex = canMoveMainAnimalTokenOnceMore ? mainLandscapeIndex : associatedLandscapeIndex
    const moves: MaterialMove[] = []

    if (landscapeIndex !== 0) {
      moves.push(
        token
          .moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[landscapeIndex - 1]
          })
      )
    }

    if (landscapeIndex !== 5) {
      moves.push(
        token
          .moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[landscapeIndex + 1]
          })
      )
    }

    moves.push(
      ...this.goToNextRule()
    )

    return moves
  }

  get animalsTokens() {
    return new AnimalTokensHelper(this.game, this.player).animalTokens
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.TotemToken)(move)) return []
    return this.goToNextRule()
  }

  goToNextRule() {
    const playerState = new PlayerState(this.game, this.player)
    if (this.remind(Memory.LastRound)) {
      if (this.player === this.game.players[this.game.players.length - 1]) {
        return [this.startRule(RuleId.Scoring)]
      } else {
        const nextPlayer = this.nextPlayer
        return [this.startPlayerTurn(RuleId.PlayAnimalCards, nextPlayer)]
      }
    }

    if (playerState.canGivePenaltyCard) {
      return [this.startRule(RuleId.Bear)]
    }

    return [this.startRule(RuleId.DrawAnimalCards)]
  }
}