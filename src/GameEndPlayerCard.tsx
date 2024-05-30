import { UniqueIdentifier } from "@dnd-kit/core";
import Player from './types.tsx'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import 'reactjs-popup/dist/index.css';
import CardPopUp from "./CardPopUp.tsx";

/** GameEndPlayerCard: displays individual player card
 *
 * Props:
 * - listing: { title:,
 *              city:,
 *              ...   }
 *
 * RoutesList -> BasketballPage -> ListingsList -> ListingCard -> Badge
 */
function GameEndPlayerCard({ player }: {player: Player}) {


  return (
    <div className="flex flex-row text-center">

        <div className="">
            {player.name}
        </div>
    </div>
  );
}

export default GameEndPlayerCard;