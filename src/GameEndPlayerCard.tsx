
import {Player} from './types.tsx'

import 'reactjs-popup/dist/index.css';


/** GameEndPlayerCard: displays individual player card
 *
 * Props:
 * - player: { name:,
 *              id:,
 *              ...   }
 *
 * RoutesList -> BasketballPage -> ListingsList -> ListingCard -> Badge
 */
function GameEndPlayerCard({ player, displayRecord }: {player: Player, displayRecord:boolean}) {


  return (
    <div className="flex flex-row justify-center">

        <div className="text-3xl">
            {player.name}
        </div>
        { displayRecord &&
          <div className="text-small pl-10 pt-2 justify-self-end">
            W: {player.winCount} L: {player.lossCount} T: {player.tieCount}
        </div>
        }
    </div>
  );
}

export default GameEndPlayerCard;