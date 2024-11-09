import { UniqueIdentifier } from "@dnd-kit/core";

type Player = {
    id: UniqueIdentifier,
    name: string,
    winCount:number,
    lossCount:number,
    tieCount:number,
    firstGame:boolean,
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

type playerRegister = {
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string,
}

export type {Player, Settings, quickBasketballContext, playerRegister};