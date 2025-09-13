import {Player} from '../types.tsx'
import ScoreBoardName from '../ScoreBoardName.tsx'
/** TeamScoreNext: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

function TeamScoreNext({ teamName, teamMembers }: { teamName:String, teamMembers:Player[]}) {


    return (

      <div className='w-1/3 bg-white'>
        <div className="text-center">
            <div className='bg-white rounded'>

                <h1 className='text-3xl font-bold text-black drop-shadow-lg bg-yellow-300'>
                    {teamName}
                    </h1>
                <div className='flex flex-col justify-evenly'>
                    {
                        teamMembers.map((player:Player, idx)=>(
                            <ScoreBoardName key={idx}player={player}/>
                        ))
                    }
                </div>

            </div>


        </div>
      </div>

    );
  }

export default TeamScoreNext;