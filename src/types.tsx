import { UniqueIdentifier } from "@dnd-kit/core";

type Player = {
    id: UniqueIdentifier,
    name: string,
    winCount:number,
    lossCount:number,
    tieCount:number
}

type Settings = {
    teamSize: number,
    gameClockMins: number,
    gameClockSecs: number,
    restClockMins: number,
    restClockSecs: number,
    winningScore: number,
    teamRotation: string,

}

type quickBasketballContext = {
    settings:Settings,
    setSettings:Function
}

export type {Player, Settings, quickBasketballContext};