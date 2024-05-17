import { LocationType } from "@gamepark/arctic/material/LocationType";
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";
import { animalCardDescription } from "../../material/AnimalCardDescription";

class AnimalPileDescription extends LocationDescription {
    getLocations(context: MaterialContext): Location[] {
        if (context.player === undefined)
            return []
        else
            return [{ type: LocationType.AnimalPile, player: context.player }]
    }
    coordinates = { x: 20, y: 20, z: 5 }
    width = animalCardDescription.width
    ratio = animalCardDescription.ratio
}

export const animalPileDescription = new AnimalPileDescription()