/** @jsxImportSource @emotion/react */

import { MoveAnimalTokensRule } from '@gamepark/arctic/rules/MoveAnimalTokensRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const MoveAnimalTokensHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new MoveAnimalTokensRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.move-tokens.you"/>
  }

  return <Trans defaults="header.move-tokens.player" values={{ player: name }}/>
}
