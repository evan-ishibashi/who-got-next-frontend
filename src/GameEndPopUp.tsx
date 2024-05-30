import { useState, useEffect, useRef } from 'react';
import Popup from 'reactjs-popup';
import Player from './types';
import GameEndPlayerCard from './GameEndPlayerCard';
//

const GameEndPopUp = ({gameLive, winningTeam, losingTeam, teamNext, isTied}:{gameLive:boolean, winningTeam:Player[], losingTeam:Player[], teamNext:Player[], isTied:boolean}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [isFirst, setIsFirst] = useState(true);



  useEffect(()=>{
    if(!gameLive && !isFirst){
        setOpen(true);
    } else if (isFirst){
        setIsFirst(false);
    }
  },[gameLive]);


  return (
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div className='flex flex-col text-center bg-green-300'>
                    <h1 className='text-4xl'>Winning Team</h1>
                    {
                        winningTeam.map((player:Player)=>(
                            <div>
                                <GameEndPlayerCard player={player}/>
                            </div>
                        ))}
                </div>
                <div className='flex flex-col text-center bg-red-300'>
                    <h1 className='text-4xl'>Losing Team</h1>
                    {
                        losingTeam.map((player:Player)=>(
                            <div>
                                <GameEndPlayerCard player={player}/>
                            </div>
                        ))}
                </div>
            </div>
            <div className='flex flex'>

            </div>
          </div>
        </div>
      </Popup>
  );
};
export default GameEndPopUp;