import Clock from "./Clock.tsx";
import TeamScore from "./TeamScore.tsx";
import Player from "./types.tsx";
import GameEndPopUp from './GameEndPopUp.tsx';

import {useEffect, useState} from 'react'
import TeamScoreNext from "./TeamScoreNext.tsx";
import TeamScoreGameNotStarted from "./TeamScoreGameNotStarted.tsx";
/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 */

const WINNINGSCORE = 15;

function ScoreBoard({ teamOne, teamTwo, teamNext, gameLive, setGameLive, rotatePlayers, setPlayers }: {teamOne:Player[], teamTwo:Player[],teamNext:Player[], gameLive:boolean, setGameLive:Function, rotatePlayers:Function, setPlayers:Function }) {
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);
    const [isFirstMount, setIsFirstMount] = useState<boolean>(true);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [fullDisplay, setFullDisplay] = useState<boolean>(true);
    const [teamOneLabel, setTeamOneLabel] = useState<String>("Home");
    const [teamTwoLabel, setTeamTwoLabel] = useState<String>("Away");
    const [teamOneWins, setTeamOneWins] = useState<boolean>(false);


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
            setTeamOneWins(true);

        }
        if (teamOneScore < teamTwoScore){
            setTeamOneWins(false);
        }
        if(gameLive){
           resetAllScore();
           setFullDisplay(true);
           teamStatusLive();
        }
        if(!gameLive && !isFirstMount){
            teamStatusBreak();
            setFullDisplay(false);
        }
        setIsFirstMount(false)

    },[gameLive]);

    const resetAllScore = () => {
        setTeamOneScore(0);
        setTeamTwoScore(0);
    }

    const teamStatusBreak = () => {
        setTeamOneLabel("You're Playing Again:");
        setTeamTwoLabel("You're On:");
    }

    const teamStatusLive = () => {
        setTeamOneLabel("Home");
        setTeamTwoLabel("Away");
    }

    const handleEndClick = () => {
        setGameLive()
    }

    const handleListReset = () => {
        localStorage.clear();
        setPlayers([])

    }

    const toggleGameHasStarted = (bool:boolean) => {
        setGameHasStarted(()=> bool)
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

            <div className='flex flex-row justify-evenly '>
                {
                    fullDisplay
                    ?
                        gameHasStarted
                        ?
                        <TeamScore teamName={teamOneLabel} teamMembers={teamOne} score={teamOneScore} updateScore={updateT1Score}/>
                        :
                        <TeamScoreGameNotStarted teamName={teamOneLabel} teamMembers={teamOne} score={teamTwoScore}/>
                    :
                    <TeamScoreNext teamName={teamOneLabel} teamMembers={teamOne}/>
                }
                <Clock gameLive={gameLive} setGameLive={setGameLive} toggleGameHasStarted={toggleGameHasStarted} resetAllScore={resetAllScore}/>
                {
                    fullDisplay
                    ?
                        gameHasStarted
                        ?

                        <TeamScore teamName={teamTwoLabel} teamMembers={teamTwo} score={teamTwoScore} updateScore={updateT2Score}/>
                        :
                        <TeamScoreGameNotStarted teamName={teamTwoLabel} teamMembers={teamTwo} score={teamTwoScore}/>
                    :
                    <TeamScoreNext teamName={teamTwoLabel} teamMembers={teamTwo}/>
                }
            </div>
            <div className="flex flex-row justify-center bg-white mb-2 pb-2">
                <button
                    className={`${gameHasStarted ? 'bg-orange-500 hover:bg-orange-700 text-white font-bold': 'bg-gray-300 text-black'} px-4 rounded mt-2 mb-2 mr-1`}
                    onClick={handleEndClick}
                    disabled={!gameHasStarted}
                    >
                        { gameLive ?
                            "End Game"
                            :
                            "End Break"

                        }
                </button>
                <button
                    className={'bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 rounded mt-2 mb-2'}
                    onClick={handleListReset}
                    >
                        Reset Players
                </button>
                <GameEndPopUp gameLive={gameLive} teamOne={teamOne} teamTwo={teamTwo} teamNext={teamNext} teamOneWins={teamOneWins} isTied={isTied} rotatePlayers={rotatePlayers} resetAllScore={resetAllScore}/>
            </div>
        </>

    );
  }

export default ScoreBoard;