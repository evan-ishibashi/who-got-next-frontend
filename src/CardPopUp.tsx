import { UniqueIdentifier } from "@dnd-kit/core";
import Player from './types.tsx'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import { contentStyle, overlayStyle} from './CardPopUpStyle.tsx'

/** QuickPlayerCard: displays individual player card
 *
 * Props:
 * - listing: { title:,
 *              city:,
 *              ...   }
 *
 * RoutesList -> QuickBasketballPage -> QuickBasketballPlayerList -> QuickPlayerCard -> CardPopUp
 */
function CardPopUp({player, addPlayer, removePlayer, idx}: {player:Player, addPlayer:(name:string,idx:number)=> void, removePlayer:Function, idx:number}) {
    const [input, setInput] = useState('');

    const handleAddBefore = (evt:any) => {
        evt.preventDefault();
        if (!input) return;

        addPlayer(input,idx);

        setInput('');
    }

    const handleRemove = () => {
        removePlayer(idx)
    }




  return (
         <Popup trigger=
                {<button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full'
                    >
                    +
                </button>}
                position="right center"
                {...{ modal:false, closeOnDocumentClick:true, contentStyle, overlayStyle }}

                >

                <div className="flex flex-col">

                    <div className="flex flex-row w-12">
                    <input
                        type="text"
                        value={input}
                        placeholder={`Add Before ${player.name}`}
                        onChange={e => setInput(e.target.value)}
                        className='mr-2 mt-1 bg-gray-50 border border-gray-300 rounded'
                        />
                    <button
                        onClick={handleAddBefore}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded'
                        >
                        Add
                        </button>
                    </div>
                    <div className="flex flex-row justify-center mt-2">
                    <button
                        onClick={handleRemove}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded'
                        >
                        {`Remove ${player.name}`}
                        </button>

                    </div>
                </div>
            </Popup>
  );
}

export default CardPopUp;