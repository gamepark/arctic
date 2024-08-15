/** @jsxImportSource @emotion/react */

import { DrawAnimalCardsRule } from '@gamepark/arctic/rules/DrawAnimalCardsRule'
import { Memory } from '@gamepark/arctic/rules/Memory'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
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

  if (itsMe) {
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

  return <Trans defaults="header.draw.player" values={{ player: name, number: depositValue }}/>
}
