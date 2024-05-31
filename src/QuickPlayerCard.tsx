import { UniqueIdentifier } from "@dnd-kit/core";
import Player from './types.tsx'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import 'reactjs-popup/dist/index.css';
import CardPopUp from "./CardPopUp.tsx";

/** QuickPlayerCard: displays individual player card
 *
 * Props:
 * - listing: { title:,
 *              city:,
 *              ...   }
 *
 * RoutesList -> BasketballPage -> ListingsList -> ListingCard -> Badge
 */
function QuickPlayerCard({ id, idx, player, addPlayer, removePlayer, color }: { id: UniqueIdentifier, idx:number, player: Player, addPlayer:(name:string,idx:number)=> void, removePlayer:Function, color:string }) {
   const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

   const style = {
    transition,
    transform: CSS.Transform.toString(transform),
   }

  return (
    <div
        ref={setNodeRef}
        style={style}
        className={`max-w-full md:max-w-full rounded overflow-hidden shadow-lg ${color}
        transition-all duration-500 cursor-pointer flex flex-row justify-between`}
    >
        <div className="pt-1 pl-1">

         <CardPopUp player={player} addPlayer={addPlayer} removePlayer={removePlayer} idx={idx} />
        </div>
        <div className="self-center flex flex-row text-bold text-2xl">
            {`${idx + 1}. `}{player.name}
        </div>
        <div className="pr-2 pt-1 touch-none">
            <button
            {...attributes}
            {...listeners}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
    </div>
  );
}

export default QuickPlayerCard;