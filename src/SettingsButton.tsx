import { useContext, useEffect, useState } from "react";
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
    const closeModal = () => {
        // Reset form data to current saved settings when closing without saving
        setFormData(currSettings);
        setOpen(false);
    };
    const config = useContext(settingsContext);
    const currSettings = config?.settings!;
    const setSettings = config?.setSettings!;

    const [formData, setFormData] = useState(currSettings);

    // Check if form is valid (no empty required fields)
    const isFormValid = () => {
        const requiredFields = ['gameClockMins', 'gameClockSecs', 'restClockMins', 'restClockSecs', 'winningScore', 'teamSize'];
        return requiredFields.every(field => {
            const value = formData[field as keyof typeof formData];
            return value !== '' && value !== null && value !== undefined && !isNaN(Number(value));
        });
    };

    /**Handles form input change */
    function handleChange(e:any) {
        const { name, value } = e.target;
        // Convert numeric fields to numbers, but allow empty strings for editing
        const numericFields = ['gameClockMins', 'gameClockSecs', 'restClockMins', 'restClockSecs', 'winningScore', 'teamSize'];
        let processedValue = value;

        if (numericFields.includes(name)) {
            // Allow empty string for editing, convert to number only if not empty
            processedValue = value === '' ? '' : Number(value);
        }

        setFormData(current => ({
            ...current,
            [name]: processedValue
        }));
    }

    /**handles form Submit - updates user data */
    function handleSubmit(e:any) {
        e.preventDefault();

        // Check if form is valid before submitting
        if (!isFormValid()) {
            alert('Please fill in all required fields before saving.');
            return;
        }

        try {
            // Convert empty strings to 0 for numeric fields before saving
            const convertToNumber = (value: any): number => {
                if (value === '' || value === null || value === undefined) return 0;
                const num = Number(value);
                return isNaN(num) ? 0 : num;
            };

            const processedFormData = {
                ...formData,
                gameClockMins: convertToNumber(formData.gameClockMins),
                gameClockSecs: convertToNumber(formData.gameClockSecs),
                restClockMins: convertToNumber(formData.restClockMins),
                restClockSecs: convertToNumber(formData.restClockSecs),
                winningScore: convertToNumber(formData.winningScore),
                teamSize: convertToNumber(formData.teamSize),
            };

            console.log('Saving settings:', processedFormData);
            localStorage.setItem('quickBballSettings', JSON.stringify(processedFormData))
            setSettings(processedFormData);
            closeModal();

        } catch (errs) {
            console.log(errs);
        }

    }

     // Handles When End game, or end break button is pressed
     useEffect(()=>{
        let quickBballSettings = localStorage.getItem('quickBballSettings');
        if (quickBballSettings) setFormData(JSON.parse(quickBballSettings));
        }
    ,[])

    // Reset form data to current settings when modal opens
    useEffect(() => {
        if (open) {
            setFormData(currSettings);
        }
    }, [open, currSettings]);

    return (
        <div>
            <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                onClick={() => setOpen(o => !o)}
                title="Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>

            <Popup
                open={open}
                closeOnDocumentClick={false}
                onClose={closeModal}
                contentStyle={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '0',
                    border: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxWidth: '500px',
                    width: '90vw'
                }}
                overlayStyle={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)'
                }}
            >
                <div className="bg-white rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Game Settings</h2>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-gray-200 transition-colors duration-200"
                                title="Close settings"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {!isFormValid() && (
                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    ⚠️ Please fill in all required fields before saving.
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Game Clock Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Game Clock</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gameClockMins" className="block text-sm font-medium text-gray-700 mb-2">
                                            Minutes <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="gameClockMins"
                                            name="gameClockMins"
                                            type="number"
                                            min="0"
                                            max="99"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.gameClockMins}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gameClockSecs" className="block text-sm font-medium text-gray-700 mb-2">
                                            Seconds <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="gameClockSecs"
                                            name="gameClockSecs"
                                            type="number"
                                            min="0"
                                            max="59"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.gameClockSecs}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rest Clock Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Rest Clock</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="restClockMins" className="block text-sm font-medium text-gray-700 mb-2">
                                            Minutes <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="restClockMins"
                                            name="restClockMins"
                                            type="number"
                                            min="0"
                                            max="99"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.restClockMins}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="restClockSecs" className="block text-sm font-medium text-gray-700 mb-2">
                                            Seconds <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="restClockSecs"
                                            name="restClockSecs"
                                            type="number"
                                            min="0"
                                            max="59"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.restClockSecs}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Game Rules Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Game Rules</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="winningScore" className="block text-sm font-medium text-gray-700 mb-2">
                                            Score to Win <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="winningScore"
                                            name="winningScore"
                                            type="number"
                                            min="1"
                                            max="59"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.winningScore}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                                            Players Per Team <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="teamSize"
                                            name="teamSize"
                                            type="number"
                                            min="1"
                                            max="20"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            onChange={handleChange}
                                            value={formData.teamSize}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Team Rotation Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Team Rotation</h3>

                                <div>
                                    <label htmlFor="teamRotation" className="block text-sm font-medium text-gray-700 mb-2">
                                        Rotation Rules
                                    </label>
                                    <select
                                        id="teamRotation"
                                        name="teamRotation"
                                        value={formData.teamRotation}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="winnerStays">Winner Stays On</option>
                                        <option value="playTwo">Play Two and Off</option>
                                        <option value="bothOff">Both Teams Off</option>
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Reset form data to current saved settings when canceling
                                        setFormData(currSettings);
                                        setOpen(false);
                                    }}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
                                        isFormValid()
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Popup>
        </div>
    );
};


export default SettingsButton;