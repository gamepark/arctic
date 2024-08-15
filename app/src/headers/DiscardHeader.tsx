/** @jsxImportSource @emotion/react */
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PuffinRule } from '@gamepark/arctic/rules/PuffinRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DiscardHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new PuffinRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const itsMe = playerId && playerId === activePlayer
  const playerState = new PlayerState(game, activePlayer)
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.discard.you" values={{ number: playerState.hand.length - 7 }}/>
  }

  return <Trans defaults="header.discard.player" values={{ player: name,  number: playerState.hand.length - 7 }}/>
}
