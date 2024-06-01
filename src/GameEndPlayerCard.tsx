
import Player from './types.tsx'

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
function GameEndPlayerCard({ player }: {player: Player}) {


  return (
    <div className="flex flex-row justify-center">

        <div className="text-3xl">
            {player.name}
        </div>
        {/* <div className="text-small pl-2">
            w: {player.winCount}
        </div> */}
    </div>
  );
}

export default GameEndPlayerCard;