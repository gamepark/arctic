/** @jsxImportSource @emotion/react */
import { PuffinRule } from '@gamepark/arctic/rules/PuffinRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const BearHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new PuffinRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.bear.you"/>
  }

  return <Trans defaults="header.bear.player" values={{ player: name }}/>
}
