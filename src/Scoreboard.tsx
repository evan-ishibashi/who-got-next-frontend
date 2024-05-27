import Clock from "./Clock.tsx";
import TeamScore from "./TeamScore.tsx";
import Player from "./types.tsx";

import {useState} from 'react'
/** QuickBasketballPlayerList: displays list of Players
 *
 * Props:
 * - players like [{listing},...]
 */

function ScoreBoard({ }: { }) {
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);
    const [time, setTime] = useState(0);


    return (

      <div className='flex flex-row justify-evenly'>
        <TeamScore team={1} score={teamOneScore} />
        <Clock time={time}/>
        <TeamScore team={2} score={teamTwoScore} />
      </div>

    );
  }

export default ScoreBoard;