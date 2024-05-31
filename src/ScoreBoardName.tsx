
import Player from './types.tsx'
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
            className="bg-black text-white font-bold px-0.5 rounded mr-0.5 mt-0.5 mb-1/2 text-2xl"

        >
            {player.name}
        </div>

  );
}

export default ScoreBoardName;