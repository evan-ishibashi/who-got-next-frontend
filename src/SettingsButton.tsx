import { useContext, useState } from "react";
import { settingsContext } from "./QuickBasketballPage";
import Popup from 'reactjs-popup';
/** PointButton: Updates Scoreboard with given value
 *
 * Props:
 * - players like [{listing},...]
 */
//

const SettingsButton = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const config = useContext(settingsContext);
    const currSettings = config?.settings!;
    const setSettings = config?.setSettings!;

    const [formData, setFormData] = useState(currSettings);

    /**Handles form input change */
    function handleChange(e:any) {
        const { name, value } = e.target;
        setFormData(current => ({
            ...current,
            [name]: value
        }));
    }

    /**handles form Submit - updates user data */
    function handleSubmit(e:any) {
        e.preventDefault();
        try {
            setSettings(formData);
            closeModal();

        } catch (errs) {
            console.log(errs);
        }

    }

    return (
        <div>
        <button type="button" className="button" onClick={() => setOpen(o => !o)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

        </button>
        <Popup open={open} closeOnDocumentClick={false} onClose={closeModal}>
            <div className="modal">

                <form onSubmit={handleSubmit}>
                    <input id="gameClockMins" name="gameClockMins" className="w-10" onChange={handleChange} value={`${formData.gameClockMins}`} />
                    <label htmlFor="gameClockMins">{"Game Clock Minutes (0 - 99)"}</label>
                    <br />
                    <input id="gameClockSecs" disabled name="gameClockSecs" className="w-10" onChange={handleChange} value={formData.gameClockSecs} />
                    <label htmlFor="gameClockSecs">{"Game Clock Seconds (0 - 59)"}</label>
                    <br />
                    <input id="restClockMins" name="restClockMins" className="w-10" onChange={handleChange} value={`${formData.restClockMins}`} />
                    <label htmlFor="restClockMins">{"Rest Clock Minutes (0 - 99)"}</label>
                    <br />
                    <input id="restClockSecs" disabled name="restClockSecs" className="w-10" onChange={handleChange} value={formData.restClockSecs} />
                    <label htmlFor="restSecs">{"Rest Clock Seconds (0 - 59)"}</label>
                    <br />
                    <input id="winningScore" name="winningScore" className="w-10" onChange={handleChange} value={formData.winningScore} />
                    <label htmlFor="winningScore">{"Score Needed to Win (0-59)"}</label>
                    <br />
                    <input id="teamSize" name="teamSize" className="w-10"  onChange={handleChange} value={`${formData.teamSize}`} />
                    <label htmlFor="teamSize">{"Players Per Team (1-20)"}</label>
                    <br />
                    <select id="teamRotation" name="teamRotation" value={formData.teamRotation} onChange={handleChange}>
                        <option value="winnerStays">Winner Stays On</option>
                        <option value="playTwo">Play Two and Off</option>
                        <option value="bothOff">Both Teams Off</option>
                    </select>
                    <label htmlFor="teamRotation">Team Rotation Rules</label>
                    <br />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-2 mr-2">
                        Submit
                    </button>
                </form>
                <a className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded mt-2 mb-2' onClick={closeModal}>
                CANCEL
            </a>
            </div>
        </Popup>
        </div>
        );
};


export default SettingsButton;