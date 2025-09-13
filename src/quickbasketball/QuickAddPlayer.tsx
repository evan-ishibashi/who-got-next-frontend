import { useState } from 'react';

/** QuickPlayerCard: displays individual player card
 *
 * Props:
 * - listing: { title:,
 *              city:,
 *              ...   }
 *
 * RoutesList -> BasketballPage -> ListingsList -> ListingCard -> Badge
 */
function QuickAddPlayer({ addPlayer, playersCount }: { addPlayer:Function, playersCount:number }) {
    const [input, setInput] = useState('')

    const handleSubmit = (evt:any) => {
        evt.preventDefault();
        if (!input) return;

        addPlayer(input,playersCount);

        setInput('');
    }
  return (
    <div className="max-w-full md:max-w-full rounded overflow-hidden shadow-lg bg-white cursor-pointer">
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit}>

            <input
                type="text"
                value={input}
                placeholder='Type Player Name'
                onChange={e => setInput(e.target.value)}
                className='mr-2 mt-1 bg-gray-50 border border-gray-300 rounded'
                />
            <button
                onClick={handleSubmit}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded'
                >
                Add
                </button>
                    </form>
        </div>
    </div>
  );
}

export default QuickAddPlayer;