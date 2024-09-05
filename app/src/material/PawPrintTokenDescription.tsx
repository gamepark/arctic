import { LocationType } from "@gamepark/arctic/material/LocationType";
import { RoundTokenDescription, MaterialContext } from "@gamepark/react-game";
import FirstPlayerToken from '../images/player/first-player.jpg'
import { PawPrintHelp } from "./help/PawPrintHelp";

export class PawPrintTokenDescription extends RoundTokenDescription {
  diameter = 3.5

  getStaticItems(context: MaterialContext) {
    return [{
      location: {
        type: LocationType.PawPrint,
        player: context.rules.players[0]
      }
    }]
  }

  image = FirstPlayerToken

  help = PawPrintHelp
}

export const pawPrintTokenDescription = new PawPrintTokenDescription()