/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArcticRules } from '@gamepark/arctic/ArcticRules'
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { useRules } from '@gamepark/react-game'
import { LocationHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const ReserveHelp: FC<LocationHelpProps> = () => {
  const { t } = useTranslation()
  const rules = useRules<ArcticRules>()!
  const stockLength = rules.material(MaterialType.AnimalCard).location(LocationType.Reserve).length


  return (
    <>
      <h2 css={titleCss}>{t('stock')}</h2>
      <p>{t('stock.count', { number: stockLength})}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`