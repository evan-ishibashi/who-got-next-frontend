
/** PointButton: Updates Scoreboard with given value
 *
 * Props:
 * - players like [{listing},...]
 */

function PointButton({ pointValue, updateScore }: { pointValue:number, updateScore:(value: number) => void }) {

    const handleClick = () => {
        updateScore(pointValue)
    }

    // Determine button styling based on point value
    const getButtonStyles = () => {
        if (pointValue === -1) {
            return "bg-red-500 hover:bg-red-600 active:bg-red-700 shadow-lg hover:shadow-xl";
        } else {
            // All positive numbers use blue
            return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg hover:shadow-xl";
        }
    };

    return (
     <button
        onClick={handleClick}
        className={`
            ${getButtonStyles()}
            text-white font-bold
            px-3 py-2 md:px-6 md:py-3
            rounded-xl md:rounded-2xl
            text-lg md:text-2xl
            min-w-[60px] md:min-w-[80px]
            min-h-[50px] md:min-h-[60px]
            transition-all duration-200 ease-in-out
            transform hover:scale-105 active:scale-95
            border-2 border-white/20
            focus:outline-none focus:ring-4 focus:ring-white/30
            disabled:opacity-50 disabled:cursor-not-allowed
            mx-1 md:mx-2
        `}>
        {pointValue > 0 ? `+${pointValue}` : pointValue}
     </button>
    );
  }

export default PointButton;