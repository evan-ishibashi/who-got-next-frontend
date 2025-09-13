import Clock from "./Clock.tsx";
import TeamScore from "./TeamScore.tsx";
import {Player} from "./types.tsx";
import GameEndPopUp from './GameEndPopUp.tsx';
import SettingsButton from './SettingsButton.tsx'

import {useContext, useEffect, useState, useRef} from 'react'
import TeamScoreNext from "./TeamScoreNext.tsx";
import TeamScoreGameNotStarted from "./TeamScoreGameNotStarted.tsx";
import { settingsContext } from "./QuickBasketballPage.tsx";
/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 *
 *
 */

function ScoreBoard({ teamOne, teamTwo, teamNext, gameLive, setGameLive, rotatePlayers, setPlayers, updatePlayerRecord, reverseRotatePlayers }: {teamOne:Player[], teamTwo:Player[],teamNext:Player[], gameLive:boolean, setGameLive:Function, rotatePlayers:Function, setPlayers:Function, updatePlayerRecord:Function, reverseRotatePlayers:Function }) {
    const config = useContext(settingsContext);
    const winningScore = config?.settings.winningScore!;
    const teamRotationSetting = config?.settings.teamRotation!;

    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);
    const [isFirstMount, setIsFirstMount] = useState<boolean>(true);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [fullDisplay, setFullDisplay] = useState<boolean>(true);
    const [teamOneLabel, setTeamOneLabel] = useState<String>("Home");
    const [teamTwoLabel, setTeamTwoLabel] = useState<String>("Away");
    const [teamOneWins, setTeamOneWins] = useState<boolean>(false);
    const [teamsSwapped, setTeamsSwapped] = useState<boolean>(true);

    // Ref to access clock component methods
    const clockRef = useRef<any>(null);

    let isTied = teamOneScore === teamTwoScore ? true : false;

    useEffect(()=>{
        if (teamOneScore >= winningScore){
            setGameLive(gameLive);
        }
        if (teamTwoScore >= winningScore){
            setGameLive(gameLive);
        }
        // handles updating if teamOne Wins is true or not, before the game ends, so the pop-up component is correct.
        if (teamTwoScore > teamOneScore) {
            setTeamOneWins(false)
        }
        if (teamOneScore > teamTwoScore) {
            setTeamOneWins(true)
        }

    },[teamOneScore,teamTwoScore]);

    //handles when game switches from live to off.
    useEffect(()=>{

        if(gameLive){
           resetAllScore();
           setFullDisplay(true);
           teamStatusLive();
        }
        if(!gameLive && !isFirstMount){
            teamStatusBreak();
            setFullDisplay(false);
            if(isTied){
                updatePlayerRecord('tie','tie');
            } else {
                if(teamOneWins) updatePlayerRecord('win','loss');
                if(!teamOneWins) updatePlayerRecord('loss','win');
            }
        }
        setIsFirstMount(false)

    },[gameLive]);

    // Hot key functionality
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if focus is in any form input (input, textarea, select, or contenteditable)
            const activeElement = document.activeElement;
            const isFormElement = activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.tagName === 'SELECT' ||
                activeElement.getAttribute('contenteditable') === 'true'
            );

            // Only handle hot keys if not focused on form elements
            if (!isFormElement) {
                switch (event.key) {
                    case ' ':
                    case 'Enter':
                        // Spacebar or Enter to start/pause
                        event.preventDefault();
                        if (clockRef.current) {
                            clockRef.current.toggleTimer();
                        }
                        break;
                    case '1':
                        // Plus 1 for left team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamTwoScore(prev => Math.max(0, prev + 1));
                        } else {
                            setTeamOneScore(prev => Math.max(0, prev + 1));
                        }
                        break;
                    case '2':
                        // Plus 2 for left team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamTwoScore(prev => Math.max(0, prev + 2));
                        } else {
                            setTeamOneScore(prev => Math.max(0, prev + 2));
                        }
                        break;
                    case '3':
                        // Plus 3 for left team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamTwoScore(prev => Math.max(0, prev + 3));
                        } else {
                            setTeamOneScore(prev => Math.max(0, prev + 3));
                        }
                        break;
                    case '4':
                        // Minus 1 for left team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamTwoScore(prev => Math.max(0, prev - 1));
                        } else {
                            setTeamOneScore(prev => Math.max(0, prev - 1));
                        }
                        break;
                    case '7':
                        // Plus 1 for right team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamOneScore(prev => Math.max(0, prev + 1));
                        } else {
                            setTeamTwoScore(prev => Math.max(0, prev + 1));
                        }
                        break;
                    case '8':
                        // Plus 2 for right team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamOneScore(prev => Math.max(0, prev + 2));
                        } else {
                            setTeamTwoScore(prev => Math.max(0, prev + 2));
                        }
                        break;
                    case '9':
                        // Plus 3 for right team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamOneScore(prev => Math.max(0, prev + 3));
                        } else {
                            setTeamTwoScore(prev => Math.max(0, prev + 3));
                        }
                        break;
                    case '6':
                        // Minus 1 for right team
                        event.preventDefault();
                        if (teamsSwapped) {
                            setTeamOneScore(prev => Math.max(0, prev - 1));
                        } else {
                            setTeamTwoScore(prev => Math.max(0, prev - 1));
                        }
                        break;
                    case '/':
                        // End Game / End Break (only works when button is enabled)
                        if (gameHasStarted) {
                            event.preventDefault();
                            handleEndClick();
                        }
                        break;
                }
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [teamsSwapped, gameHasStarted]); // Include gameHasStarted for the '/' hotkey

    const resetAllScore = () => {
        setTeamOneScore(0);
        setTeamTwoScore(0);
    }

    const teamStatusBreak = () => {
        if (teamRotationSetting === "bothOff"){
            setTeamOneLabel("You're On:");
            setTeamTwoLabel("You're On:");
        }
        else {
            setTeamOneLabel("You're Playing Again:");
            setTeamTwoLabel("You're On:");
        }
    }

    const teamStatusLive = () => {
        setTeamOneLabel("Home");
        setTeamTwoLabel("Away");
    }

    const handleEndClick = () => {
        setGameLive()
    }

    const handleListReset = () => {
        let backup = localStorage.players;
        localStorage.clear();
        localStorage.setItem('backup',backup)
        setPlayers([])

    }

    const toggleGameHasStarted = (bool:boolean) => {
        setGameHasStarted(()=> bool);
    }


    const updateT1Score = (value:number)=> {
        if(teamOneScore + value > 0) {
            setTeamOneScore(teamOneScore + value)
        } else {
            setTeamOneScore(0);
        }
    }
    const updateT2Score = (value:number)=> {
        if(teamTwoScore + value > 0) {
            setTeamTwoScore(teamTwoScore + value)
        } else {
            setTeamTwoScore(0);
        }
    }

    const handleReverseRotatePlayers = () => {
        reverseRotatePlayers();
    }

    const handleSwapTeams = () => {
        setTeamsSwapped(!teamsSwapped);
    }




    return (
        <>

            <div className='flex flex-row justify-evenly '>
                {
                    teamsSwapped ? (
                        // Default layout: teamTwo on the left, teamOne on the right
                        <>
                            {
                                fullDisplay
                                ?
                                    gameHasStarted
                                    ?
                                    <TeamScore teamName={teamTwoLabel} teamMembers={teamTwo} score={teamTwoScore} updateScore={updateT2Score}/>
                                    :
                                    <TeamScoreGameNotStarted teamName={teamTwoLabel} teamMembers={teamTwo}/>
                                :
                                <TeamScoreNext teamName={teamTwoLabel} teamMembers={teamTwo}/>
                            }
                            <Clock ref={clockRef} gameLive={gameLive} setGameLive={setGameLive} toggleGameHasStarted={toggleGameHasStarted} resetAllScore={resetAllScore}/>
                            {
                                fullDisplay
                                ?
                                    gameHasStarted
                                    ?
                                    <TeamScore teamName={teamOneLabel} teamMembers={teamOne} score={teamOneScore} updateScore={updateT1Score}/>
                                    :
                                    <TeamScoreGameNotStarted teamName={teamOneLabel} teamMembers={teamOne}/>
                                :
                                <TeamScoreNext teamName={teamOneLabel} teamMembers={teamOne}/>
                            }
                        </>
                    ) : (
                        // Swapped layout: teamOne on the left, teamTwo on the right
                        <>
                            {
                                fullDisplay
                                ?
                                    gameHasStarted
                                    ?
                                    <TeamScore teamName={teamOneLabel} teamMembers={teamOne} score={teamOneScore} updateScore={updateT1Score}/>
                                    :
                                    <TeamScoreGameNotStarted teamName={teamOneLabel} teamMembers={teamOne}/>
                                :
                                <TeamScoreNext teamName={teamOneLabel} teamMembers={teamOne}/>
                            }
                            <Clock ref={clockRef} gameLive={gameLive} setGameLive={setGameLive} toggleGameHasStarted={toggleGameHasStarted} resetAllScore={resetAllScore}/>
                            {
                                fullDisplay
                                ?
                                    gameHasStarted
                                    ?
                                    <TeamScore teamName={teamTwoLabel} teamMembers={teamTwo} score={teamTwoScore} updateScore={updateT2Score}/>
                                    :
                                    <TeamScoreGameNotStarted teamName={teamTwoLabel} teamMembers={teamTwo}/>
                                :
                                <TeamScoreNext teamName={teamTwoLabel} teamMembers={teamTwo}/>
                            }
                        </>
                    )
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
                    className={`${gameHasStarted ? 'bg-gray-300 text-black' : 'bg-orange-500 hover:bg-orange-700 text-white font-bold'} px-4 rounded mt-2 mb-2 mr-1`}
                    onClick={handleReverseRotatePlayers}
                    disabled={gameHasStarted}
                    >
                        Undo Rotation
                </button>
                <button
                    className={'bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded mt-2 mb-2 mr-1'}
                    onClick={handleListReset}
                    >
                        Reset Players
                </button>
                <button
                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded mt-2 mb-2 mr-1'}
                    onClick={handleSwapTeams}
                    >
                        {teamsSwapped ? 'Swap Teams' : 'Swap Back'}
                </button>
                <div className="mt-2 pl-2">
                    <SettingsButton />
                </div>
                {/* Info Icon with Tooltip */}
                <div className="relative group ml-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold cursor-help mt-2">
                        i
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        <div className="text-center">
                            <div className="font-bold mb-1">Hotkeys:</div>
                            <div>Space/Enter : Start/Pause Clock</div>
                            <div>/ : End Game/Break</div>
                            <div>For Left Team Score:</div>
                            <div>1 : +1</div>
                            <div>2 : +2</div>
                            <div>3 : +3</div>
                            <div>4 : -1</div>
                            <div>For Right Team Score:</div>
                            <div>7 : +1</div>
                            <div>8 : +2</div>
                            <div>9 : +3</div>
                            <div>6 : -1</div>
                        </div>
                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                </div>
                <GameEndPopUp gameLive={gameLive} teamOne={teamOne} teamTwo={teamTwo} teamNext={teamNext} teamOneWins={teamOneWins} isTied={isTied} rotatePlayers={rotatePlayers} resetAllScore={resetAllScore} teamsSwapped={teamsSwapped}/>
            </div>
        </>

    );
  }

export default ScoreBoard;