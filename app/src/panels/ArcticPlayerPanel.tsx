/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/arctic/PlayerId'
import { Player } from '@gamepark/react-client'
import { StyledPlayerPanel } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import BackgroundPlayer1 from '../images/panel/player-1.jpg'
import BackgroundPlayer2 from '../images/panel/player-2.jpg'
import BackgroundPlayer3 from '../images/panel/player-3.jpg'
import BackgroundPlayer4 from '../images/panel/player-4.jpg'

type ArcticPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>
export const ArcticPlayerPanel: FC<ArcticPlayerPanelProps> = (props) => {
  const { player, ...rest } = props


  return (
    <StyledPlayerPanel
      player={player}
      css={longPanel}
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

const longPanel = css`
  width: 37em;
  height: 4.5em !important;
  min-height: 4.5em !important;
  border-radius: 3em 1.5em 1.5em 3em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  > div:first-of-type, div:nth-of-type(2) {
    top: -0.7em;
  }
  > h2 {
    top: unset;
    max-width: 8.3em;
    bottom: 0.2em;
    height: auto;
    font-size: 2.5em;
  }
`