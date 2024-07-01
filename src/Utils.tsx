import { Settings } from "./types";

// Default settings for quick basketball game, set to lighthouse rules.
const DEFAULT_SETTINGS:Settings = {
    teamSize: 5,
    gameClockMins: 7,
    gameClockSecs: 0,
    restClockMins: 1,
    restClockSecs: 0,
    winningScore: 15,
    teamRotation: 'playTwo',
}

export {DEFAULT_SETTINGS}