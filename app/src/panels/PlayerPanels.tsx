/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { usePlayerId, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { ArcticPlayerPanel } from './ArcticPlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  const playerId = usePlayerId()
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <ArcticPlayerPanel player={player} key={player.id} css={panelPosition(players.length, index, playerId === undefined)} />
      )}
    </>,
    root
  )
}
const panelPosition = (players: number, index: number, isSpectator: boolean) => css`
  position: absolute;
  ${getPositionByPlayerCount(players, index, isSpectator)};
`

const getPositionByPlayerCount = (players: number, index: number, isSpectator: boolean) => {
  if (players === 4) return getFourPlayerPanelPosition(index, isSpectator)
  if (players === 3) return getThreePlayerPanelPosition(index, isSpectator)
  if (players === 2) return getTwoPlayerPanelPosition(index)
  return
}

const getThreePlayerPanelPosition = (index: number, isSpectator: boolean) => {
  switch (index) {
    case 0: return isSpectator? css`left: 50%; bottom: 2em; transform: translateX(-50%) translateX(-68em)`: css`left: 50%; bottom: 1em; transform: translateX(-50%) translateX(-18em)`
    case 1: return css`left: 50%; top: 8em; transform: translateX(-50%) translateX(${isSpectator? -68: -60.5}em)`
    case 2: return css`left: 50%; top: 8em; transform: translateX(-50%) translateX(${isSpectator? 34.5: 60.5}em)`
  }

  return
}

const getTwoPlayerPanelPosition = (index: number) => {
  switch (index) {
    case 0: return css`left: 50%; bottom: 1em; transform: translateX(-50%) translateX(-18em)`
    case 1: return css`left: 50%; top: 8.5em; transform: translateX(-50%) translateX(-18em)`
  }

  return
}

const getFourPlayerPanelPosition = (index: number, isSpectator: boolean) => {
  switch (index) {
    case 0: return isSpectator? css`left: 50%; bottom: 2em; transform: translateX(-50%) translateX(-68em)`: css`left: 50%; bottom: 1em; transform: translateX(-50%) translateX(-18em)`
    case 1: return css`left: 50%; top: 8em; transform: translateX(-50%) translateX(${isSpectator? -68: -60.5}em)`
    case 2: return isSpectator? css`left: 50%; top: 8em; transform: translateX(-50%) translateX(34.5em)`: css`left: 50%; top: 8em; transform: translateX(-50%)`
    case 3: return isSpectator? css`left: 50%; bottom: 2em; transform: translateX(-50%) translateX(${isSpectator? 34.5: 40.5}em)`: css`left: 50%; top: 8em; transform: translateX(-50%) translateX(60.5em)`
  }

  return
}

export const playerColorCode: Record<PlayerId, string> = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'yellow'
}