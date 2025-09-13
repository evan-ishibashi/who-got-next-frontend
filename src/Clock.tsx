
/** Clock: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

const CONVERT2SECONDS = 60;

import { useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { settingsContext } from './QuickBasketballPage';
import hornSound from './audio/buzzer/horn.mp3'

const Clock = forwardRef(({gameLive, setGameLive, toggleGameHasStarted, resetAllScore}:{gameLive:boolean, setGameLive:Function, toggleGameHasStarted:Function, resetAllScore:Function}, ref) => {
    const config = useContext(settingsContext); // use Context, which grabs settings

    // Calculate time values that update when config changes
    const [gameTimeInSecs, setGameTimeInSecs] = useState<number>(0);
    const [restTimeInSecs, setRestTimeInSecs] = useState<number>(0);

    const [time, setTime] = useState<number>(0); // Initial time in seconds
    const [isActive, setIsActive] = useState<boolean>(false); // Is the clock active
    const [localGame, setLocalGame] = useState<boolean>(false); // Is the game within Clock component on gametime or rest
    const [isFirstMount, setIsFirstMount] = useState<boolean>(true); // handles first time mounting
    const [endTime, setEndTime] = useState<Date | null>(null); // end time, relative to now
    const [showZeroTime, setShowZeroTime] = useState<boolean>(false); // show 0:00 in red when timer hits zero
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // set interval for timer
    const buzzerSound = new Audio(hornSound) // end of game buzzer

    // Calculate time values when config changes
    useEffect(() => {
        if (config?.settings) {
            // Ensure values are numbers, not strings
            const gameMins = Number(config.settings.gameClockMins) || 0;
            const gameSecs = Number(config.settings.gameClockSecs) || 0;
            const restMins = Number(config.settings.restClockMins) || 0;
            const restSecs = Number(config.settings.restClockSecs) || 0;

            const gameTime = (gameMins * CONVERT2SECONDS) + gameSecs;
            const restTime = (restMins * CONVERT2SECONDS) + restSecs;

            console.log('Clock calculation:', {
                gameMins, gameSecs, gameTime,
                restMins, restSecs, restTime,
                originalSettings: config.settings
            });

            setGameTimeInSecs(gameTime);
            setRestTimeInSecs(restTime);
        }
    }, [config]);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        toggleTimer: () => {
            if (isActive) {
                pauseTimer();
            } else {
                startTimer();
            }
        }
    }));

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
                    setShowZeroTime(true); // Show 0:00 in red
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
        // Only reset time to gameTimeInSecs when starting a new game, not when pausing/resuming
        if (gameLive && !isActive && isFirstMount) setTime(gameTimeInSecs);
        // Only reset rest clock when transitioning from game to rest, not when pausing during rest
        // This is handled in the gameLive useEffect above, so we don't need to reset here
    },[config, gameTimeInSecs, restTimeInSecs, gameLive, isActive, isFirstMount])

    // Reset showZeroTime when time changes (clock restarted)
    useEffect(() => {
        if (time > 0) {
            setShowZeroTime(false);
        }
    }, [time]);





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
        setShowZeroTime(false); // Reset zero time display when starting

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
        setShowZeroTime(false); // Reset zero time display
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
            <div className={`text-xl md:text-9xl ${showZeroTime ? 'text-red-500' : ''}`}>
                {showZeroTime ? '0:00' : `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`}
            </div>
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
});

export default Clock;