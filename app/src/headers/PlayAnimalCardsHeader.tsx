/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
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
  const depositValue = playerState.depositValue
  const name = usePlayerName(activePlayer)
  const canModifyPlayValue = playerState.canModifyPlayValue
  const stop = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (itsMe) {
    if (canModifyPlayValue) {
      if (depositValue <= 2) {
        if (playerState.fox !== undefined && (!playerState.isLastCardHidden || playerState.canPlaceCardUnderAnimalPile)) {
          return (
            <Trans
              defaults="header.moose.fox.play"
              components={{
                pass: <PlayMoveButton move={stop}/>
              }}
            />
          )
        }
        if (playerState.isLastCardHidden) {
          return (
            <Trans
              defaults="header.moose.play.more"
              values={{ number: depositValue }}
            />
          )
        }
        return (
          <Trans
            defaults={depositValue === 1 ? 'header.moose.play.one' : 'header.moose.play.two'}
            components={{
              pass: <PlayMoveButton move={stop}/>
            }}
          />
        )
      } else {
        return (
          <Trans
            defaults="header.moose.play.more"
            values={{ number: depositValue }}
          />
        )
      }
    }

    if (depositValue === 1) {
      if (playerState.canPlaceCardUnderAnimalPile) {
        return <Trans defaults="header.fox.under-pile"/>
      }

      if (playerState.canPlaceCardUnderLastAnimalInPile) {
        return <Trans defaults="header.fox.under-animal"/>
      }
    }

    return <Trans defaults="header.play-card.you" values={{ number: depositValue }}/>
  }

  if (canModifyPlayValue) {
    if (playerState.isLastCardHidden) {
      return (
        <Trans
          defaults="header.moose.play.more.player"
          values={{ player: name, number: depositValue }}
        />
      )
    }

    if (depositValue <= 2) {
      return (
        <Trans
          defaults={depositValue === 1 ? 'header.moose.play.one.player' : 'header.moose.play.two.player'}
          values={{ player: name }}
        />
      )
    } else {
      return (
        <Trans
          defaults="header.moose.play.more.player"
          values={{ player: name, number: depositValue }}
        />
      )
    }
  }

  return <Trans defaults="header.play-card.player" values={{ number: depositValue, player: name }}/>
}
