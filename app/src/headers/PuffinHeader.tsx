/** @jsxImportSource @emotion/react */

import { PowerCard } from '@gamepark/arctic/material/PowerCard'
import { PuffinRule } from '@gamepark/arctic/rules/PuffinRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PuffinHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new PuffinRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const itsMe = playerId && playerId === activePlayer
  const puffin = rules.puffin.id
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    if (puffin === PowerCard.Puffin2) {
      return <Trans defaults="header.puffin.trade.you" />
    } else {
      return <Trans defaults="header.puffin.draw.you" />
    }
  }

  if (puffin === PowerCard.Puffin2) {
    return <Trans defaults="header.puffin.trade.player" values={{ player: name }} />
  } else {
    return <Trans defaults="header.puffin.draw.player" values={{ player: name }} />
  }
}
