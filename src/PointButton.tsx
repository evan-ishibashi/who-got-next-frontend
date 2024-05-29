
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2">
        {pointValue > 0 ? `+${pointValue}`: pointValue}
     </button>

    );
  }

export default PointButton;