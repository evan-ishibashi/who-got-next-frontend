import { UniqueIdentifier } from "@dnd-kit/core";

type Player = {
    id: UniqueIdentifier,
    name: String,
    winCount:number,
    lossCount:number,
    tieCount:number
}

export default Player;