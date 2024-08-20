/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MaterialHelpProps } from '@gamepark/react-game'

export const ScoringTokenHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2 css={titleCss}>{t('scoring')}</h2>
      <p>{t('scoring.help1')}</p>
      <p>{t('scoring.help2')}</p>
      <p>
        <table css={tableCss} cellPadding={0} cellSpacing={0}>
          <tbody>
          <tr>
            <td>{t('scoring.help3')}</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6+</td>
          </tr>
          <tr>
            <td>{t('scoring.help4')}</td>
            <td>1</td>
            <td>3</td>
            <td>6</td>
            <td>10</td>
            <td>15</td>
          </tr>
          </tbody>
        </table>
      </p>
      <p>{t('scoring.help5')}</p>
      <p>{t('scoring.help6')}</p>
      <p>{t('scoring.help7')}</p>
      <p>{t('scoring.help8')}</p>
      <p>{t('scoring.help9')}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`

const tableCss = css`
  width: 90%;
  border: 0;
  tr:first-of-type > td {
    border-bottom: 0.1em solid black;
  }
  td:first-of-type {
    width: 50%;
  }
  td:not(:last-of-type) {
    border-right: 0.1em solid black;
  }
  
  td:not(:first-of-type) {
    text-align: center;
    padding: 0.5em 1em 0.5em 1em;
  }
`