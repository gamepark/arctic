/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { GamePageState, Player } from '@gamepark/react-client'
import { StyledPlayerPanel, usePlayerTime } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import BackgroundPlayer1 from '../images/panel/player-1.jpg'
import BackgroundPlayer2 from '../images/panel/player-2.jpg'
import BackgroundPlayer3 from '../images/panel/player-3.jpg'
import BackgroundPlayer4 from '../images/panel/player-4.jpg'

type ArcticPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>
export const ArcticPlayerPanel: FC<ArcticPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const playerTime = usePlayerTime(player.id)
  const gameOver = useSelector((state: GamePageState) => state.gameOver)


  return (
    <StyledPlayerPanel
      player={player}
      css={longPanel(!gameOver && playerTime !== null)}
      timerOnRight
      backgroundImage={getBackground(player.id)}
      activeRing
      {...rest}
    />
  )
}

const getBackground = (playerId: PlayerId) => {
  switch (playerId) {
    case 1: return BackgroundPlayer1
    case 2: return BackgroundPlayer2
    case 3: return BackgroundPlayer3
    case 4: return BackgroundPlayer4
  }

  return
}

const longPanel = (hasTimer: boolean) => css`
  width: 37em;
  height: 4.5em;
  border-radius: 3em 1.5em 1.5em 3em;
  > div:first-of-type, div:nth-of-type(2) {
    top: -0.7em;
  }
  > h2 {
    right: ${hasTimer? 3.7: 0.2}em;
    top: unset;
    bottom: 0.2em;
    height: auto;
    font-size: 2.5em;
  }
`