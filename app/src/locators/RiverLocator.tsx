import { LineLocator, ZoomDirection } from '@gamepark/react-game'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { RiverDescription } from './descriptions/RiverDescription'

class RiverLocator extends LineLocator {
    locationDescription = new RiverDescription()
    coordinates = this.locationDescription.originCoordinates
    delta = { x: animalCardDescription.width + 1, y: 0 }
    getZoomDirection() {
        return ZoomDirection.Center
    }
}

export const riverLocator = new RiverLocator()