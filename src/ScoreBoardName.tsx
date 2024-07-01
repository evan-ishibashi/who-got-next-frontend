
import {Player} from './types.tsx'
import 'reactjs-popup/dist/index.css';


/** ScoreBoardName: displays individual player card
 *
 * Props:
 * - listing: { title:,
 *              city:,
 *              ...   }
 *
 * RoutesList -> BasketballPage -> ListingsList -> ListingCard -> Badge
 */
function ScoreBoardName({ player }: {player: Player}) {


  return (

        <div
            className="invisible md:visible bg-black text-white font-bold px-0.5 rounded mr-0.5 mt-0.5 mb-1/2 md:text-3xl text-center"

        >
            {player.name}
        </div>

  );
}

export default ScoreBoardName;