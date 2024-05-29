import Clock from "./Clock.tsx";
import TeamScore from "./TeamScore.tsx";
import Player from "./types.tsx";

import {useState} from 'react'
/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 */

function ScoreBoard({ teamOne, teamTwo }: {teamOne:Player[], teamTwo:Player[] }) {
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);
    const [time, setTime] = useState(0);

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

      <div className='flex flex-row justify-evenly'>
        <TeamScore teamName={1} teamMembers={teamOne} score={teamOneScore} updateScore={updateT1Score} />
        <Clock time={time}/>
        <TeamScore teamName={2} teamMembers={teamTwo} score={teamTwoScore} updateScore={updateT2Score} />
      </div>

    );
  }

export default ScoreBoard;