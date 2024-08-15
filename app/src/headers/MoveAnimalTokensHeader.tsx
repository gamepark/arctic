/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { AnimalTokensHelper } from '@gamepark/arctic/rules/helper/AnimalTokensHelper'
import { MoveAnimalTokensRule } from '@gamepark/arctic/rules/MoveAnimalTokensRule'
import { useAnimation, useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const MoveAnimalTokensHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame>()!
  const rules = new MoveAnimalTokensRule(game)
  const playerId = usePlayerId()
  const activePlayer = rules.game.rule?.player!
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const { mainToken, mainAnimalId, associatedToken, associatedAnimalId } = new AnimalTokensHelper(game, activePlayer).animalTokens
  const animalTokenMoving = useAnimation<MoveItem>(({ move }) => isMoveItemType(MaterialType.TotemToken)(move))
  const isMainMoving = animalTokenMoving && animalTokenMoving.move.itemIndex === mainToken.getIndex()
  if (animalTokenMoving) {
    const actualLandscapeId = isMainMoving? mainToken.getItem()!.location.id!: associatedToken.getItem()!.location.id!
    if (animalTokenMoving.move.location.id! > actualLandscapeId) {
      return (
        <Trans
          defaults="header.token.right"
          values={{
            animal: t(`animal.${isMainMoving? mainAnimalId: associatedAnimalId}`)
          }}
        />
      )
    }

    if (animalTokenMoving.move.location.id! < actualLandscapeId) {
      return (
        <Trans
          defaults="header.token.left"
          values={{
            animal: t(`animal.${isMainMoving? mainAnimalId: associatedAnimalId}`)
          }}
        />
      )
    }
  }

  if (itsMe) {
    return (
      <Trans
        defaults="header.move-tokens.you"
        values={{
          animal1: t(`animal.${mainAnimalId}`),
          animal2: t(`animal.${associatedAnimalId}`)
        }}
      />
    )
  }

  return (
    <Trans defaults="header.move-tokens.player"
           values={{
             player: name,
             animal1: t(`animal.${mainAnimalId}`),
             animal2: t(`animal.${associatedAnimalId}`)
           }}
    />
  )
}
