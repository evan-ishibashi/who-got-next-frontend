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

type registerPlayerFormData = {
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    photoUrl:string,
}

type loginFormData = {
    username:string,
    password:string,
}

type JwtPayload = {
    username:string,
}

type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    photoUrl?: string,
}

export type {
    Player,
    Settings,
    quickBasketballContext,
    registerPlayerFormData,
    loginFormData,
    JwtPayload,
    User,
};