/** @jsxImportSource @emotion/react */

import { DrawAnimalCardsRule } from '@gamepark/arctic/rules/DrawAnimalCardsRule'
import { Memory } from '@gamepark/arctic/rules/Memory'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DrawAnimalCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new DrawAnimalCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const depositValue = rules.remind(Memory.DrawValue)

  if (itsMe) {
    return <Trans defaults="header.draw.you" values={{ number: depositValue }}/>
  }

  return <Trans defaults="header.draw.player" values={{ player: name, number: depositValue }}/>
}
