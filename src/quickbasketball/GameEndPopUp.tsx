import { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import { Player } from '../types';
import GameEndPlayerCard from './GameEndPlayerCard';
import { overlayStyle } from './GameEndPopUpStyle.tsx';
import { settingsContext } from './QuickBasketballPage.tsx';

//Settings
// const TEAMROTATIONSETTING: string = 'playTwo';
// const TEAMROTATIONSETTING:string = 'winnerStays';
// const TEAMROTATIONSETTING = 'bothOff';


const GameEndPopUp = ({ gameLive, teamOne, teamTwo, teamNext, teamOneWins, isTied, rotatePlayers, resetAllScore, teamsSwapped }: { gameLive: boolean, teamOne: Player[], teamTwo: Player[], teamNext: Player[], teamOneWins: boolean, isTied: boolean, rotatePlayers: Function, resetAllScore: Function, teamsSwapped: boolean }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const config = useContext(settingsContext);
  const teamRotationSetting = config?.settings.teamRotation!;

  const [checkBoxOne, setCheckBoxOne] = useState<boolean>(false);
  const [checkBoxTwo, setCheckBoxTwo] = useState<boolean>(false);
  const [rotatingTeam, setRotatingTeam] = useState<string>('first');
  const [isFirstMount, setIsFirstMount] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);



  // Use Effect Section

  // Handles Pop Up Appearing and turning off First Mount
  useEffect(() => {
    if (!gameLive && !isFirstMount) {
      clearInterval(timerRef.current!);
      // add in record change here

      if (teamRotationSetting === 'playTwo') {
        setCheckBoxOne(false);
        setCheckBoxTwo(true);
      } else if (teamRotationSetting === 'winnerStays') {
        if (isTied) {
          setCheckBoxOne(true);
          setCheckBoxTwo(true);
        } else {
          if (teamOneWins) {
            setCheckBoxOne(true);
            setCheckBoxTwo(false);
          } else {
            setCheckBoxOne(false);
            setCheckBoxTwo(true);
          }
        }
      } else if (teamRotationSetting === 'bothOff') {
        setCheckBoxOne(false);
        setCheckBoxTwo(false);
      }

      setOpen(true);
      timerRef.current = setTimeout(dismountPopUp, 15000);
    } else if (isFirstMount) {
      setIsFirstMount(false);
    }
  }, [gameLive]);

  // Handles rotating players on Pop-up Close
  useEffect(() => {
    if (!open && !isFirstMount) {
      rotatePlayers(rotatingTeam);
      resetAllScore();
    }
  }, [open]);

  // ! means that team rotates
  useEffect(() => {
    if (checkBoxOne && checkBoxTwo) {
      setRotatingTeam('none');
    } else if (checkBoxOne && !checkBoxTwo) {
      setRotatingTeam('second');
    } else if (!checkBoxOne && checkBoxTwo) {
      setRotatingTeam('first');
    } else if (!checkBoxOne && !checkBoxTwo) {
      setRotatingTeam('both');
    }
  }, [checkBoxOne, checkBoxTwo]);

  // Helper Functions


  const dismountPopUp = () => {
    closeModal();
  };

  const handleCheckBoxOne = () => {
    setCheckBoxOne(!checkBoxOne);
  };

  const handleCheckBoxTwo = () => {
    setCheckBoxTwo(!checkBoxTwo);
  };




  return (
    <Popup
      open={open}
      onClose={closeModal}
      {...{ modal: true, closeOnDocumentClick: true, overlayStyle }}
    >
      <div className="modal">
        <a className="close" onClick={closeModal}>
          &times;
        </a>
        <div className='flex flex-col'>
          <div className='grid grid-flow-row grid-cols-2 grid-row-1'>
            {teamsSwapped ? (
              // When teams are swapped: teamTwo on left, teamOne on right
              <>
                <div className={`flex flex-col text-center ${isTied ? 'bg-orange-100' : teamOneWins ? 'bg-red-300' : 'bg-green-300'}`}>
                  <h1 className='text-4xl bg-gray-200 font-bold text-black drop-shadow-lg'>
                    {isTied ? 'You Tied' : teamOneWins ? "Losing Team" : "Winning Team"}
                  </h1>
                  {
                    teamTwo.map((player: Player, idx) => (
                      <GameEndPlayerCard key={idx} player={player} displayRecord={false}/>
                    ))}
                  <div className='mt-2'>
                    <input type="checkbox" checked={checkBoxTwo} onChange={handleCheckBoxTwo} className='w-6 h-6 ml-6' />
                    Away Team Stays?
                  </div>
                </div>
                <div className={`flex flex-col text-center ${isTied ? 'bg-orange-100' : teamOneWins ? 'bg-green-300' : 'bg-red-300'}`}>
                  <h1 className='text-4xl bg-gray-200 font-bold text-black drop-shadow-lg'>
                    {isTied ? 'You Tied' : teamOneWins ? "Winning Team" : "Losing Team"}
                  </h1>
                  {
                    teamOne.map((player: Player, idx) => (
                      <GameEndPlayerCard key={idx} player={player} displayRecord={false}/>
                    ))}
                  <div className='mt-2'>
                    <input type="checkbox" checked={checkBoxOne} onChange={handleCheckBoxOne} className='w-6 h-6 ml-6' />
                    Home Team Stays?
                  </div>
                </div>
              </>
            ) : (
              // Default layout: teamOne on left, teamTwo on right
              <>
                <div className={`flex flex-col text-center ${isTied ? 'bg-orange-100' : teamOneWins ? 'bg-green-300' : 'bg-red-300'}`}>
                  <h1 className='text-4xl bg-gray-200 font-bold text-black drop-shadow-lg'>
                    {isTied ? 'You Tied' : teamOneWins ? "Winning Team" : "Losing Team"}
                  </h1>
                  {
                    teamOne.map((player: Player, idx) => (
                      <GameEndPlayerCard key={idx} player={player} displayRecord={false}/>
                    ))}
                  <div className='mt-2'>
                    <input type="checkbox" checked={checkBoxOne} onChange={handleCheckBoxOne} className='w-6 h-6 ml-6' />
                    Home Team Stays?
                  </div>
                </div>
                <div className={`flex flex-col text-center ${isTied ? 'bg-orange-100' : teamOneWins ? 'bg-red-300' : 'bg-green-300'}`}>
                  <h1 className='text-4xl bg-gray-200 font-bold text-black drop-shadow-lg'>
                    {isTied ? 'You Tied' : teamOneWins ? "Losing Team" : "Winning Team"}
                  </h1>
                  {
                    teamTwo.map((player: Player, idx) => (
                      <GameEndPlayerCard key={idx} player={player} displayRecord={false}/>
                    ))}
                  <div className='mt-2'>
                    <input type="checkbox" checked={checkBoxTwo} onChange={handleCheckBoxTwo} className='w-6 h-6 ml-6' />
                    Away Team Stays?
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='text-center bg-white'>
            <h1 className='text-4xl bg-yellow-300 font-bold text-black drop-shadow-lg'>Up Next</h1>
            {
              teamNext.map((player: Player, idx) => (
                <GameEndPlayerCard key={idx} player={player} displayRecord={true}/>
              ))}

          </div>
        </div>
      </div>
    </Popup>
  );
};
export default GameEndPopUp;