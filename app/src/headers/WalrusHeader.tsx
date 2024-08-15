/** @jsxImportSource @emotion/react */
import { AnimalTokensHelper } from '@gamepark/arctic/rules/helper/AnimalTokensHelper'
import { PlayerState } from '@gamepark/arctic/rules/PlayerState'
import { PuffinRule } from '@gamepark/arctic/rules/PuffinRule'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartRule, MaterialGame } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const WalrusHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame>()!
  const pass = useLegalMove((move) => isStartRule(move) || isStartPlayerTurn(move))
  const rules = new PuffinRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const playerState = new PlayerState(game, activePlayer)
  const { mainAnimalId, associatedAnimalId } = new AnimalTokensHelper(game, activePlayer).animalTokens
  const isMainMoving = playerState.canMoveMainAnimalTokenOnceMore
  if (itsMe) {
    return (
      <Trans defaults="header.walrus.you" values={{ animal: t(`animal.${isMainMoving? mainAnimalId: associatedAnimalId}`) }}>
        <PlayMoveButton move={pass} />
      </Trans>
    )
  }

  return <Trans defaults="header.walrus.player" values={{ player: name, animal: t(`animal.${isMainMoving? mainAnimalId: associatedAnimalId}`) }}/>
}
