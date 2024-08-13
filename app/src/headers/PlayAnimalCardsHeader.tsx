/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { PlayAnimalCardsRule } from '@gamepark/arctic/rules/PlayAnimalCardsRule'
import { PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayAnimalCardsHeader = () => {
  const rules = useRules<PlayAnimalCardsRule>()!
  const decreaseValue = useLegalMoves((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data < 0)
  const increaseValue = useLegalMoves((move) => isCustomMoveType(CustomMoveType.ModifyValue)(move) && move.data > 0)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const itsMe = playerId && playerId === activePlayer
  const canModifyValue = rules.canModifyValue

  if (itsMe) {
    if (canModifyValue) {
      return <Trans
        defaults="header.moose.play.you"
      >
        <PlayMoveButton move={increaseValue} />
        <PlayMoveButton move={decreaseValue} />
      </Trans>
    }
  }
  return <>Hello world!</>
}
