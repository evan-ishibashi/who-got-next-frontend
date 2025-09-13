import { Settings } from "./types";

// initial data for login form
const LOGIN_INITIAL_FORM_DATA = {
    username: "",
    password: ""

  };

  // initial data for login form
  const REGISTER_INITIAL_FORM_DATA = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    photoUrl: ""
  };

// Default settings for quick basketball game, set to lighthouse rules.
const DEFAULT_SETTINGS:Settings = {
    teamSize: 5,
    gameClockMins: 7,
    gameClockSecs: 0,
    restClockMins: 1,
    restClockSecs: 0,
    winningScore: 15,
    teamRotation: 'playTwo', // playTwo or winnerStays or bothOff
}

export {DEFAULT_SETTINGS, LOGIN_INITIAL_FORM_DATA, REGISTER_INITIAL_FORM_DATA}