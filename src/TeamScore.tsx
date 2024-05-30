import Player from './types.tsx'
import PointButton from './PointButton.tsx';
/** TeamScore: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

function TeamScore({ teamName, teamMembers, updateScore, score }: { teamName:number, teamMembers:Player[], updateScore:(value: number) => void, score:number }) {


    return (

      <div className='w-1/3 bg-grey-500'>
        <div className="text-center">

        <h1>
            {`Team ${teamName}`}
            </h1>
        <h2 className='text-6xl mb-3'>{score}</h2>
        <div className='flex flex-row justify-evenly'>
            <PointButton pointValue={1} updateScore={updateScore} />
            <PointButton pointValue={2} updateScore={updateScore}/>
            <PointButton pointValue={3} updateScore={updateScore}/>
            <PointButton pointValue={-1} updateScore={updateScore}/>
        </div>

        </div>
      </div>

    );
  }

export default TeamScore;