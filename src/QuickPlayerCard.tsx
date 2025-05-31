import { UniqueIdentifier } from "@dnd-kit/core";
import {Player} from './types.tsx'
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
function QuickPlayerCard({ id, idx, player, addPlayer, removePlayer, editPlayer, color }: { id: UniqueIdentifier, idx:number, player: Player, addPlayer:(name:string,idx:number)=> void, removePlayer:Function, editPlayer:Function, color:string }) {
   const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

   const style = {
    transition,
    transform: CSS.Transform.toString(transform),
   }

  return (
    <div
        ref={setNodeRef}
        style={style}
        className={`max-w-full min-w-full rounded shadow-lg ${color}
        transition-all duration-500 cursor-pointer flex flex-row justify-between`}
    >
        <div className="pt-1 pl-1">

         <CardPopUp player={player} addPlayer={addPlayer} removePlayer={removePlayer} editPlayer={editPlayer} idx={idx} />
        </div>
        <div className="self-center flex flex-row text-3xl truncate">
            {`${idx + 1}. `}{player.name} {player.firstGame && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-1 mt-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
}
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