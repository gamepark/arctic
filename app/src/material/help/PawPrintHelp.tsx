/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PawPrintHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const mine = playerId && item.location?.player === playerId
  const name = usePlayerName(item.location?.player)
  return (
    <>
      <h2 css={titleCss}>{t('paw-print-token')}</h2>
      {mine && <p>{t('paw-print-token.you')}</p>}
      {!mine && <p>{t('paw-print-token.player', { player: name })}</p>}
      <p css={endGameCss}>
        <Trans defaults="paw-print-token.help"
               components={{
                 underline: <span css={underlineCss} />
               }}
        />
      </p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`

const endGameCss = css`
  margin-top: 1em;
`

const underlineCss = css`
  text-decoration: underline;
`