/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/arctic/rules/CustomMoveType'
import { DrawAnimalCardsRule } from '@gamepark/arctic/rules/DrawAnimalCardsRule'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DrawAnimalCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new DrawAnimalCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const playerState = new PlayerState(game, activePlayer)
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const drawValue = playerState.drawValue
  const canTakeCardsOnDeck = playerState.canTakeCardsOnDeck
  const canDrawFromPenaltyCards = playerState.canDrawFromPenaltyCards
  const canModifyDrawValue = playerState.canModifyDrawValue
  const stop = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))

  if (itsMe) {
    if (canModifyDrawValue) {
      if (drawValue <= 2) {
        return (
          <Trans
            defaults={drawValue === 1 ? 'header.moose.draw.one' : 'header.moose.draw.two'}
            components={{
              pass: <PlayMoveButton move={stop}/>
            }}
          />
        )
      } else {
        return (
          <Trans
            defaults="header.moose.draw.more"
            values={{ number: drawValue }}
            components={{
              pass: <PlayMoveButton move={stop}/>
            }}
          />
        )
      }
    }

    if (canTakeCardsOnDeck && canDrawFromPenaltyCards) {
      return <Trans defaults="header.draw.pile-penalty.you" values={{ number: drawValue }}/>
    }

    if (canTakeCardsOnDeck) {
      return <Trans defaults="header.draw.pile.you" values={{ number: drawValue }}/>
    }

    if (canDrawFromPenaltyCards) {
      return <Trans defaults="header.draw.penalty.you" values={{ number: drawValue }}/>
    }

    return <Trans defaults="header.draw.you" values={{ number: drawValue }}/>
  }

  if (canModifyDrawValue) {
    if (drawValue <= 2) {
      return (
        <Trans
          defaults={drawValue === 1 ? 'header.moose.draw.one.player' : 'header.moose.draw.two.player'}
          values={{ player: name }}
        />
      )
    } else {
      return (
        <Trans
          defaults="header.moose.draw.more.player"
          values={{ player: name, number: drawValue }}
        />
      )
    }
  }

  return <Trans defaults="header.draw.player" values={{ player: name, number: drawValue }}/>
}
