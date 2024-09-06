/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { DrawAnimalCardsRule } from '@gamepark/arctic/rules/DrawAnimalCardsRule'
import { Memory } from '@gamepark/arctic/rules/Memory'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DrawAnimalCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new DrawAnimalCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const playerState = new PlayerState(game, activePlayer)
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const depositValue = rules.remind(Memory.DrawValue)
  const canTakeCardsOnDeck = playerState.canTakeCardsOnDeck
  const canDrawFromPenaltyCards = playerState.canDrawFromPenaltyCards
  const canModifyDrawValue = playerState.canModifyDrawValue
  const minValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === -1)
  const noValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 0)
  const maxValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 1)

  if (itsMe) {
    if (canModifyDrawValue) {
      const min = depositValue - 1
      const max = depositValue + 1

      const Decrease = () => <PlayMoveButton move={minValue}>{min}</PlayMoveButton>
      const Increase = () => <PlayMoveButton move={maxValue}>{max}</PlayMoveButton>
      const NoChange = () => <PlayMoveButton move={noValue}>{depositValue}</PlayMoveButton>

      return (
        <Trans defaults="header.moose.draw.you">
          <Decrease />
          <NoChange />
          <Increase />
        </Trans>
      )
    }

    if (canTakeCardsOnDeck && canDrawFromPenaltyCards) {
      return <Trans defaults="header.draw.pile-penalty.you" values={{ number: depositValue }}/>
    }

    if (canTakeCardsOnDeck) {
      return <Trans defaults="header.draw.pile.you" values={{ number: depositValue }}/>
    }

    if (canDrawFromPenaltyCards) {
      return <Trans defaults="header.draw.penalty.you" values={{ number: depositValue }}/>
    }

    return <Trans defaults="header.draw.you" values={{ number: depositValue }}/>
  }

  if (canModifyDrawValue) {
    return (
      <Trans defaults="header.moose.draw.player" values={{ player: name }} />
    )
  }

  return <Trans defaults="header.draw.player" values={{ player: name, number: depositValue }}/>
}
