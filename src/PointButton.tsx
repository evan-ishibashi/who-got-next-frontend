
/** PointButton: Updates Scoreboard with given value
 *
 * Props:
 * - players like [{listing},...]
 */

function PointButton({ pointValue, updateScore }: { pointValue:number, updateScore:(value: number) => void }) {

    const handleClick = () => {
        updateScore(pointValue)
    }


    return (

     <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:px-4 md:rounded-full md:ml-2 md:mr-2 text-small md:text-2xl">
        {pointValue > 0 ? `+${pointValue}`: pointValue}
     </button>

    );
  }

export default PointButton;