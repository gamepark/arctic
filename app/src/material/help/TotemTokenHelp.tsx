/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TotemTokenHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2 css={titleCss}>{t('animal-token')}</h2>
      <p>{t('totem.score')}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`