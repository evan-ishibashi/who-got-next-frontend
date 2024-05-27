
/** TeamScore: displays scoreboard
 *
 * Props:
 * - players like [{listing},...]
 */

function TeamScore({ team, score }: { team:number, score:number }) {


    return (

      <div className='w-1/3 bg-grey-500 font'>
        <h1>
            {`Team ${team}`}
            </h1>
        <h2>{`Score ${score}`}</h2>

      </div>

    );
  }

export default TeamScore;