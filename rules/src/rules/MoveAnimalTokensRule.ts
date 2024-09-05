import { isMoveItemType, ItemMove, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { landscapes } from '../material/Landscape'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AnimalTokensHelper } from './helper/AnimalTokensHelper'
import { Memory } from './Memory'
import { PlayerState } from './PlayerState'
import { RuleId } from './RuleId'

export class MoveAnimalTokensRule extends PlayerTurnRule {

  getPlayerMoves() {

    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animalsTokens

    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 5) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        }),
        associatedToken.moveItem({
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
        }),
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        })
      ]
    }

    if (mainLandscapeIndex === 0 && associatedLandscapeIndex === 5) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        }),
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        })
      ]
    }

    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 0) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        }),
        associatedToken.moveItem({
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
        }),
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex + 1]
        })
      ]
    }

    if (mainLandscapeIndex === 0) {
      return [
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        }),
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex - 1]
        })
      ]
    }

    if (associatedLandscapeIndex === 5) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[4]
        }),
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex + 1]
        })
      ]
    }

    if (associatedLandscapeIndex === 0) {
      return [
        associatedToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[1]
        }),
        mainToken.moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex - 1]
        })
      ]
    }

    return [
      mainToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex + 1]
        }),
      mainToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[mainLandscapeIndex - 1]
        }),
      associatedToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex + 1]
        }),
      associatedToken
        .moveItem({
          type: LocationType.LandscapeCard,
          id: landscapes[associatedLandscapeIndex - 1]
        })
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.TotemToken)(move)) return []
    const playerState = new PlayerState(this.game, this.player)
    if (this.hasMovedToken) {
      if (playerState.canMoveTokenOnceMore) {
        return [this.startRule(RuleId.Walrus)]
      }
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

    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animalsTokens
    const moves: MaterialMove[] = this.getOtherAnimalMoves(move)

    if (!moves.length) {
      if (move.itemIndex === mainToken.getIndex()) {
        const isMovingLeft = move.location.id < mainToken.getItem()!.location.id
        moves.push(
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[associatedLandscapeIndex + (isMovingLeft ? 1 : -1)]
          })
        )
      } else {
        const isMovingLeft = move.location.id < associatedToken.getItem()!.location.id
        moves.push(
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[mainLandscapeIndex + (isMovingLeft ? 1 : -1)]
          })
        )
      }
    }

    this.memorize(Memory.TokensMoved, true)
    return moves
  }

  get hasMovedToken() {
    return this.remind(Memory.TokensMoved)
  }

  get animalsTokens() {
    return new AnimalTokensHelper(this.game, this.player).animalTokens
  }

  getOtherAnimalMoves(move: MoveItem) {
    const { mainLandscapeIndex, mainToken, associatedLandscapeIndex, associatedToken } = this.animalsTokens
    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 5) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      }
    }

    if (mainLandscapeIndex === 0 && associatedLandscapeIndex === 0) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      }
    }

    if (mainLandscapeIndex === 0 && associatedLandscapeIndex === 5) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      }
    }

    if (mainLandscapeIndex === 5 && associatedLandscapeIndex === 0) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      }
    }

    if (mainLandscapeIndex === 5) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[associatedLandscapeIndex + 1]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      }
    }

    if (mainLandscapeIndex === 0) {
      if (move.itemIndex === mainToken.getIndex()) {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[associatedLandscapeIndex - 1]
          })
        ]
      } else {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      }
    }

    if (associatedLandscapeIndex === 5) {
      if (move.itemIndex === associatedToken.getIndex()) {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[mainLandscapeIndex + 1]
          })
        ]
      } else {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[4]
          })
        ]
      }
    }

    if (associatedLandscapeIndex === 0) {
      if (move.itemIndex === associatedToken.getIndex()) {
        return [
          mainToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[mainLandscapeIndex - 1]
          })
        ]
      } else {
        return [
          associatedToken.moveItem({
            type: LocationType.LandscapeCard,
            id: landscapes[1]
          })
        ]
      }
    }

    return []
  }

  onRuleEnd() {
    this.forget(Memory.TokensMoved)
    return []
  }
}