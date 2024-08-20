import { css } from '@emotion/react'
import { LocationHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const AnimalPileHelp: FC<LocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const { location } = props
  const playerId = usePlayerId()
  const mine = playerId && playerId === location.player
  const name = usePlayerName(location.player)

  return (
    <>
      <h2 css={titleCss}>{t('animal.pile.empty')}</h2>
      <p>{t(mine? 'animal.pile.you.empty': 'animal.pile.player.empty', { player: name})}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`