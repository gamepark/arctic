/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, usePlayerId } from '@gamepark/react-game'
import { FC, useMemo } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

const defaultTableSize = {
  xMin: -64,
  xMax: 62,
  yMin: -33,
  yMax: 27,
}

export const GameDisplay: FC<GameDisplayProps> = ({players}) => {
  const playerId = usePlayerId()
  const tableSize = useMemo(() => getTableSize(players, !playerId), [players, playerId])
  return <>
    <GameTable
      verticalCenter
      {...tableSize}
      margin={{ top: 7.5, left: 0, right: 0, bottom: 0 }}
      snapToCenter={false}
      css={process.env.NODE_ENV === 'development' && css`background-color: rgba(255, 255, 255, 0.2);`}
    >
      {/**<GameTableNavigation/>**/}
      <PlayerPanels/>
    </GameTable>
  </>
}

const getTableSize = (players: number, isSpectator: boolean) => {
  if (players === 2) return {
    xMin: -54,
    xMax: 52,
    yMin: -28,
    yMax: 28,
  }
  if (!isSpectator) return defaultTableSize
  return {
    xMin: -48,
    xMax: 63,
    yMin: -27,
    yMax: 26,
  }
}
