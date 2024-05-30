import Clock from "./Clock.tsx";
import TeamScore from "./TeamScore.tsx";
import Player from "./types.tsx";
import GameEndPopUp from './GameEndPopUp.tsx';

import {useEffect, useState} from 'react'
/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 */

const WINNINGSCORE = 15;

function ScoreBoard({ teamOne, teamTwo, teamNext, gameLive, setGameLive }: {teamOne:Player[], teamTwo:Player[],teamNext:Player[], gameLive:boolean, setGameLive:Function }) {
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);

    let winningTeam = teamOneScore > teamTwoScore ? teamOne : teamTwo;
    let losingTeam = teamOneScore < teamTwoScore ? teamOne : teamTwo;
    let isTied = teamOneScore === teamTwoScore ? true : false;

    useEffect(()=>{
        if (teamOneScore >= WINNINGSCORE){
            setGameLive(gameLive);
        }
        if (teamTwoScore >= WINNINGSCORE){
            setGameLive(gameLive);
        }

    },[teamOneScore,teamTwoScore]);

    useEffect(()=>{
        if (teamOneScore > teamTwoScore){
            winningTeam = teamOne;
            losingTeam = teamTwo;
        }
        if (teamOneScore < teamTwoScore){
            winningTeam = teamTwo;
            losingTeam = teamTwo;
        }
        if(gameLive){
            setTeamOneScore(0);
            setTeamTwoScore(0);
        }

    },[gameLive]);

    const handleClick = () => {
        setGameLive(gameLive)
    }


    const updateT1Score = (value:number)=> {
        if(teamOneScore + value > 0) {
            setTeamOneScore(teamOneScore + value)
        } else {
            setTeamOneScore(0)
        }
    }
    const updateT2Score = (value:number)=> {
        if(teamTwoScore + value > 0) {
            setTeamTwoScore(teamTwoScore + value)
        } else {
            setTeamTwoScore(0)
        }
    }




    return (
        <>

            <div className='flex flex-row justify-evenly'>
                <TeamScore teamName={1} teamMembers={teamOne} score={teamOneScore} updateScore={updateT1Score} />
                <Clock gameLive={gameLive} setGameLive={setGameLive}/>
                <TeamScore teamName={2} teamMembers={teamTwo} score={teamTwoScore} updateScore={updateT2Score} />
            </div>
            <div className="flex flex-row justify-center">
                <button
                    className={`${gameLive ? 'bg-orange-500 hover:bg-orange-700 text-white' : 'bg-gray-300 text-black'}font-bold px-4 rounded mt-2 mb-2`}
                    onClick={handleClick}
                    disabled={!gameLive}
                    >
                        End Game
                </button>
                <GameEndPopUp gameLive={gameLive} winningTeam={winningTeam} losingTeam={losingTeam} teamNext={teamNext} isTied={isTied} />
            </div>
        </>

    );
  }

export default ScoreBoard;