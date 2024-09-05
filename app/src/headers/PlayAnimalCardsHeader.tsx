/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { Memory } from '@gamepark/arctic/rules/Memory'
import { PlayAnimalCardsRule } from '@gamepark/arctic/rules/PlayAnimalCardsRule'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayAnimalCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new PlayAnimalCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule!.player!
  const playerState = new PlayerState(game, activePlayer)
  const itsMe = playerId && playerId === activePlayer
  const depositValue = rules.remind(Memory.DepositValue)
  const name = usePlayerName(activePlayer)
  const canModifyPlayValue = playerState.canModifyPlayValue
  const minValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === -1)
  const noValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 0)
  const maxValue = useLegalMove((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data === 1)

  if (itsMe) {
    if (canModifyPlayValue) {
      const min = depositValue - 1
      const max = depositValue + 1

      return (
        <Trans defaults="header.moose.play.you">
          <PlayMoveButton move={minValue}>{min}</PlayMoveButton>
          <PlayMoveButton move={noValue}>{depositValue}</PlayMoveButton>
          <PlayMoveButton move={maxValue}>{max}</PlayMoveButton>
        </Trans>
      )
    }

    if (depositValue === 1) {
      if (playerState.canPlaceCardUnderAnimalPile) {
        return <Trans defaults="header.fox.under-pile" />
      }

      if (playerState.canPlaceCardUnderLastAnimalInPile) {
        return <Trans defaults="header.fox.under-animal" />
      }
    }

    return <Trans defaults="header.play-card.you" values={{ number: depositValue }} />
  }

  if (canModifyPlayValue) {
    return (
      <Trans defaults="header.moose.play.player" values={{ player: name }} />
    )
  }


  return <Trans defaults="header.play-card.player" values={{ number: depositValue, player: name }} />

}
