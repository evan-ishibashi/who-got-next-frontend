import {Player} from './types.tsx'
import PointButton from './PointButton.tsx';
import ScoreBoardName from './ScoreBoardName.tsx'
/** TeamScore: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

function TeamScore({ teamName, teamMembers, updateScore, score }: { teamName:String, teamMembers:Player[], updateScore:(value: number) => void, score:number}) {


    return (

      <div className='w-1/3 bg-white'>
        <div className="text-center">
            <div className='bg-blue-200 rounded pb-2'>

                <h1 className='text-3xl text-bold'>
                    {teamName}
                    </h1>
                <div className='flex flex-row justify-evenly'>
                    {
                        teamMembers.map((player:Player, idx)=>(
                            <ScoreBoardName key={idx} player={player}/>
                        ))
                    }
                </div>

            </div>

        <h2 className='text-xl md:text-6xl md:mb-4 md:mt-3 bg-white'>{score}</h2>
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