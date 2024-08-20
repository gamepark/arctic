/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/arctic/material/LocationType'
import { MaterialType } from '@gamepark/arctic/material/MaterialType'
import { LocationHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { PenaltyZoneLocation } from '../../material/help/AnimalCardHelp'

export const PenaltyZoneHelp: FC<LocationHelpProps> = (props) => {
  return <PenaltyZoneLocation
    item={{ location: { type: LocationType.PenaltyZone, player: props.location.player } }}
    itemType={MaterialType.AnimalCard}
    {...props}
  />
}