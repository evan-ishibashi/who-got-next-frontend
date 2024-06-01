import QuickAddPlayer from "./QuickAddPlayer.tsx";
import QuickPlayerCard from "./QuickPlayerCard.tsx";
import Player from "./types.tsx";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 */

function QuickBasketballPlayerList({ players, addPlayer, removePlayer }: { players: Player[], addPlayer:(name:string,idx:number)=> void, removePlayer:Function }) {


    return (

      <div className={`grid-container grid-cols-1 justify-evenly grid-flow-col gap-2 md:grid  md:gap-2 md:${players.length < 31 ? 'grid-cols-3':'grid-cols-4'} md:grid-rows-10`}>
        <SortableContext items = {players!} strategy={verticalListSortingStrategy}>

        {players?.map((player:Player, idx) => (
            <QuickPlayerCard id={player.id} idx={idx} key={player.id} player={player} addPlayer={addPlayer} removePlayer={removePlayer} color={(idx % 10) > 4 ? 'bg-orange-200' : 'bg-white'} />
        ))}
        {players.length < 40 &&

            <QuickAddPlayer addPlayer={addPlayer} playersCount={players.length}/>
    }
        </SortableContext>
      </div>

    );
  }

export default QuickBasketballPlayerList;