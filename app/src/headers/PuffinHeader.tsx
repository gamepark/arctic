/** @jsxImportSource @emotion/react */

import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PuffinRule } from '@gamepark/arctic/rules/PuffinRule'
import { RuleId } from '@gamepark/arctic/rules/RuleId'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isStartRule, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PuffinHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new PuffinRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const playerState = new PlayerState(rules.game, activePlayer)
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isStartRule(move) && move.id === RuleId.PlayAnimalCards)

  if (itsMe) {
    if (playerState.canExchangeCardWithRiver) {
      return (
        <Trans defaults="header.puffin.trade.you">
          <PlayMoveButton move={pass} />
        </Trans>
      )
    } else {
      return <Trans defaults="header.puffin.draw.you" />
    }
  }

  if (playerState.canExchangeCardWithRiver) {
    return <Trans defaults="header.puffin.trade.player" values={{ player: name }} />
  } else {
    return <Trans defaults="header.puffin.draw.player" values={{ player: name }} />
  }
}
