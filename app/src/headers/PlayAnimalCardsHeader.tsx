/** @jsxImportSource @emotion/react */

import { Memory } from '@gamepark/arctic/rules/Memory'
import { PlayAnimalCardsRule } from '@gamepark/arctic/rules/PlayAnimalCardsRule'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
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

  if (itsMe) {
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


  return <Trans defaults="header.play-card.player" values={{ number: depositValue, player: name }} />

}
