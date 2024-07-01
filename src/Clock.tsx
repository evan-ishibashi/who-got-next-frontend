
/** Clock: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

const CONVERT2SECONDS = 60;

import { useState, useRef, useEffect, useContext } from 'react';
import { settingsContext } from './QuickBasketballPage';
import hornSound from './audio/buzzer/horn.mp3'

const Clock = ({gameLive, setGameLive, toggleGameHasStarted, resetAllScore}:{gameLive:boolean, setGameLive:Function, toggleGameHasStarted:Function, resetAllScore:Function}) => {
    const config = useContext(settingsContext); // use Context, which grabs settings
    const gameTimeInSecs = ((config?.settings.gameClockMins! * CONVERT2SECONDS) + config?.settings.gameClockSecs!);
    const restTimeInSecs = ((config?.settings.restClockMins! * CONVERT2SECONDS) + config?.settings.restClockSecs!);

    const [time, setTime] = useState<number>(gameTimeInSecs); // Initial time in seconds
    const [isActive, setIsActive] = useState<boolean>(false); // Is the clock active
    const [localGame, setLocalGame] = useState<boolean>(false); // Is the game within Clock component on gametime or rest
    const [isFirstMount, setIsFirstMount] = useState<boolean>(true); // handles first time mounting
    const [endTime, setEndTime] = useState<Date | null>(null); // end time, relative to now
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // set interval for timer
    const buzzerSound = new Audio(hornSound) // end of game buzzer



    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            console.log('Clearing timer:', timerRef.current);
            timerRef.current = null;
            console.log('Clearing timer after', timerRef.current);
        }

        console.log(timerRef)
        if (isActive && endTime) {
            const tick = () => {
                const currentTime = new Date().getTime();
                const remainingTime = Math.max(0, Math.floor((endTime.getTime() - currentTime) / 1000));
                setTime(remainingTime);

                if (remainingTime === 0) {
                    console.log('gameLive is', gameLive);
                    clearInterval(timerRef.current!);
                    setIsActive(false);
                    if (gameLive) {
                        buzzerSound.play();
                        setTime(restTimeInSecs);
                        console.log(time)
                        setLocalGame(false);
                    } else {
                        (console.log("second option triggered gameLive FALSE"))
                        setTime(gameTimeInSecs);
                        toggleGameHasStarted(false);
                        setLocalGame(true);
                    }
                    setGameLive();
                    console.log(time)
                }
            };
            clearInterval(timerRef.current!);
            console.log(timerRef)
            timerRef.current = setInterval(tick, 1000);
            tick(); // Ensure the timer updates immediately
        } else {
            clearInterval(timerRef.current!);
        }

        return () => clearInterval(timerRef.current!);
    }, [isActive, endTime]);


    // Handles When End game, or end break button is pressed
    useEffect(()=>{
        console.log('gameLive in 2ns Use effect', gameLive)
        console.log('isActive in 2nd Use Effect', isActive)
        // console.log('localGame', localGame)
        if(!gameLive && localGame){
            clearInterval(timerRef.current!);
            setIsActive(false);
            toggleGameHasStarted(false);
            setTime(restTimeInSecs);
            setEndTime(null);
            setLocalGame(!localGame)
        }

        if(gameLive && !localGame){
            clearInterval(timerRef.current!);
            setIsActive(false);
            toggleGameHasStarted(false);
            setTime(gameTimeInSecs);
            setEndTime(null);
            setLocalGame(localGame)
            // startTimer();
        }
    },[gameLive])

    // Handles updating game and break time clock display
    useEffect(()=>{
        if (isFirstMount) setTime(gameTimeInSecs)
        if (gameLive && !isActive) setTime(gameTimeInSecs);
        if (!gameLive && !isFirstMount) setTime(restTimeInSecs);
    },[config])





    const startTimer = () => {
        if(isFirstMount){
            setGameLive();
            setLocalGame(true)
            setIsFirstMount(false)
        }
        if(gameLive){
            setLocalGame(true)
        }
        clearInterval(timerRef.current!)
        const now = new Date().getTime();
        const end = new Date(now + time * 1000);
        setIsActive(true);

        toggleGameHasStarted(true);
        setEndTime(end);
    };

    const pauseTimer = () => {
        clearInterval(timerRef.current!);
        setIsActive(false);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current!);
        setIsActive(false);
        toggleGameHasStarted(false);
        resetAllScore();
        setTime(gameTimeInSecs); // Reset to initial time
        setEndTime(null);
    };


    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);

    return (
        <div className="timer-container w-1/3 text-center bg-white">

            <div
                hidden={isFirstMount}
                className='text-small md:text-4xl'
            >
                {
                gameLive ?
                "Game Clock"
                :
                "Next Game Starts in:"
                }
            </div>
            <div hidden={!isFirstMount} className='text-small md:text-4xl'>
                Welcome, Press Start
            </div>
            <div className="text-xl md:text-8xl">{`${minutes}:${seconds > 9 ? seconds : '0' + seconds}`}</div>
            <div className="buttons">
                { isActive ?
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2'onClick={pauseTimer}>Pause</button>
                    :
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2'onClick={startTimer}>Start</button>
                }
                <button
                    className={`${(localGame) ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold': 'bg-gray-300 text-black'}  px-4 rounded ml-2 mr-2`}
                    onClick={resetTimer}
                    disabled={!localGame}>Reset</button>
            </div>
        </div>
    );
};

export default Clock;