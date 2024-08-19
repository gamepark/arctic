import { DropAreaDescription } from '@gamepark/react-game'
import { animalCardDescription } from '../../material/AnimalCardDescription'

export class PlayerHandDescription extends DropAreaDescription {
    borderRadius = animalCardDescription.borderRadius
    width = (animalCardDescription.width + 0.7) * 6.6
    height = (animalCardDescription.height + 2) + (6.6 * 0.5)
}