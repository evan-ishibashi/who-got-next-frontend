import Player from './types.tsx'
import ScoreBoardName from './ScoreBoardName.tsx'
/** TeamScoreGameNotStarted: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

function TeamScoreGameNotStarted({ teamName, teamMembers }: { teamName:String, teamMembers:Player[]}) {


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

        <h2 className='text-small md:text-6xl md:mb-4 md:mt-3 bg-white'>CHECK IT UP</h2>
        <div className='flex flex-row justify-evenly'>
            Please Start Game
        </div>


        </div>
      </div>

    );
  }

export default TeamScoreGameNotStarted;