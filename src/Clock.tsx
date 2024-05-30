
/** Clock: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

const GAMETIME = 7;
const RESTTIME = 1
const CONVERT2SECONDS = 60;

import { useState, useRef, useEffect } from 'react';

const Clock = ({gameLive, setGameLive}:{gameLive:boolean, setGameLive:Function}) => {
    const [time, setTime] = useState<number>(GAMETIME * CONVERT2SECONDS); // Initial time in seconds
    const [isActive, setIsActive] = useState<boolean>(false);
    const [localGame, setLocalGame] = useState<boolean>(false);
    const [isFirstMount, setIsFirstMount] = useState<boolean>(true);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
                    console.log('gameLive is', gameLive)
                    clearInterval(timerRef.current!);
                    setIsActive(false);
                    if (gameLive) {
                        console.log("first option triggered gameLive TRUE")
                        console.log(RESTTIME * CONVERT2SECONDS)
                        setTime(RESTTIME * CONVERT2SECONDS);
                        console.log(time)
                        setLocalGame(false);
                    } else {
                        (console.log("second option triggered gameLive FALSE"))
                        setTime(GAMETIME * CONVERT2SECONDS);
                        setLocalGame(true);
                    }
                    setGameLive();
                    console.log(time)
                    // startTimer();
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

    useEffect(()=>{
        console.log('gameLive in 2ns Use effect', gameLive)
        // console.log('localGame', localGame)
        if(!gameLive && localGame){
            clearInterval(timerRef.current!);
            console.log(timerRef.current)
            setIsActive(false);
            setTime(RESTTIME * CONVERT2SECONDS);
            setEndTime(null);
            setLocalGame(!localGame)
            // startTimer();
        }
    },[gameLive])



    const startTimer = () => {
        if(isFirstMount){
            setGameLive();
            setLocalGame(true)
            setIsFirstMount(false)
        }
        clearInterval(timerRef.current!)
        const now = new Date().getTime();
        const end = new Date(now + time * 1000);
        setIsActive(true);
        setEndTime(end);
    };

    const pauseTimer = () => {
        clearInterval(timerRef.current!);
        setIsActive(false);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current!);
        setIsActive(false);
        setTime(GAMETIME * CONVERT2SECONDS); // Reset to initial time
        setEndTime(null);
    };


        const seconds = Math.floor(time % 60);
        const minutes = Math.floor((time / 60) % 60);

    return (
        <div className="timer-container w-1/3 text-center">
            <div hidden={isFirstMount}>{
                gameLive ?
                "Game Clock"
                :
                "Next Game Starts in:"
                }
            </div>
            <div hidden={!isFirstMount}>
                Welcome, Press Start
            </div>
            <div className="text-8xl">{`${minutes}:${seconds > 9 ? seconds : '0' + seconds}`}</div>
            <div className="buttons">
                { isActive ?
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2'onClick={pauseTimer}>Pause</button>
                    :
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2'onClick={startTimer}>Start</button>
                }
                <button
                    className={`${gameLive ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold': 'bg-gray-300 text-black'}  px-4 rounded ml-2 mr-2`}
                    onClick={resetTimer}
                    disabled={!gameLive}>Reset</button>
            </div>
        </div>
    );
};

export default Clock;