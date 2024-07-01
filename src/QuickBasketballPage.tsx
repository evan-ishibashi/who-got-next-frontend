import { useEffect, useState } from 'react';
import QuickBasketballPlayerList from './QuickBasketballPlayerList';
import { DndContext, PointerSensor, UniqueIdentifier, closestCorners, useSensors, useSensor, TouchSensor, KeyboardSensor } from '@dnd-kit/core';
import {Player, Settings, quickBasketballContext} from './types';
import { DEFAULT_SETTINGS } from './Utils';
import { createContext } from "react";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ScoreBoard from './Scoreboard';
import allenHello from './audio/personal/allenhello.mp3';


/** BasketballQuickPage:
 *
 * State:
 *
 */


export const settingsContext = createContext<quickBasketballContext | null>(null);


function QuickBasketballPage() {
  const [players, setPlayers] = useState< Player[]>([]);
  const [gameLive, setGameLive] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<number>(1);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const allen = new Audio(allenHello);

  let teamOne = players.slice(0,settings!.teamSize);
  let teamTwo = players.slice(settings!.teamSize, settings!.teamSize * 2);
  let teamNext = players.slice(settings!.teamSize * 2, settings!.teamSize * 3);


  useEffect(function setLocalStorage(): void {
    let players = localStorage.getItem('players');
    let playerId = localStorage.getItem('playerId');
    let quickBballSettings = localStorage.getItem('quickBballSettings');
    if (players) setPlayers(JSON.parse(players));
    if (playerId) setPlayerId(JSON.parse(playerId));
    if (quickBballSettings) setPlayerId(JSON.parse(quickBballSettings));

  }, []);

  //Toggles Game Live from True/False
  const gameToggle = () => {
    setGameLive((gameLive) => !gameLive);
  }


  //Add Player to List
  const addPlayer = (name:string, idx:number) => {
    if (name.toLowerCase() === 'allen') allen.play();

    if(idx === players.length) {
      localStorage.setItem('players', JSON.stringify([...players, {id:playerId, name:name, winCount:0, lossCount:0, tieCount:0}]))
      setPlayers((players) => [...players, {id:playerId, name:name, winCount:0, lossCount:0, tieCount:0}]);
      localStorage.setItem('playerId', JSON.stringify(playerId +1));
      setPlayerId((playerId) => playerId +1);

    } else {
      setPlayers(function (players) {

        let playerList =[...players];
        playerList.splice(idx, 0, {id:playerId, name:name, winCount:0, lossCount:0, tieCount:0});
        localStorage.setItem('players', JSON.stringify(playerList))
        setPlayerId((playerId) => playerId +1);

        return playerList;
      }
    );
      }
  }

  //Remove Player from List
  const removePlayer = (idx:number) => {
    setPlayers(function (players) {

      let playerList =[...players];
      playerList.splice(idx, 1);
      localStorage.setItem('players', JSON.stringify(playerList))

      return playerList;
      }
    );
  }

  //Edit Player name
  const editPlayerName = (name:string, idx:number) => {
    setPlayers(function (players) {

      let playerList =[...players];
      playerList[idx]['name'] = name;
      localStorage.setItem('players', JSON.stringify(playerList))

      return playerList;
      }
    );
  }

  //Edit Player name
  const updatePlayerRecord = (teamOne:string, teamTwo:string) => {
    console.log("UPDATE PLAYER RECORD RAN")
    setPlayers(function (players) {
      console.log("UPDATE PLAYER RECORD INSIDE RAN")
      let playerList =[...players];
      //Handles Team One and two Record Update
      for (let i = 0; i < settings.teamSize * 2; i++) {
        if (i < settings.teamSize) {
            switch (teamOne) {
                case "tie":
                    playerList[i]['tieCount'] += 1;
                    break;
                case "win":
                    playerList[i]['winCount'] += 1;
                    break;
                case "loss":
                    playerList[i]['lossCount'] += 1;
                    break;
                default:
                    break;
            }
        } else {
            switch (teamTwo) {
                case "tie":
                    playerList[i]['tieCount'] += 1;
                    break;
                case "win":
                    playerList[i]['winCount'] += 1;
                    break;
                case "loss":
                    playerList[i]['lossCount'] += 1;
                    break;
                default:
                    break;
            }
        }
    }
      localStorage.setItem('players', JSON.stringify(playerList))

      return playerList;
      }
    );
  }


// rotates Teams: input rotating Team === 'first', 'second', or 'both'
  const rotatePlayers = (rotatingTeam:string) => {
    console.log('Team Rotated off', rotatingTeam)
    if(rotatingTeam === 'none') return;

    let finishedTeam:Player[];

      setPlayers(function (players) {

      let playerList =[...players];

      if(rotatingTeam === "first"){
        finishedTeam = playerList.splice(0, settings.teamSize);
      } else if(rotatingTeam === 'second') {
        finishedTeam = playerList.splice(settings.teamSize, settings.teamSize);
      } else if (rotatingTeam === 'both') {
        finishedTeam = playerList.splice(0, settings.teamSize * 2);
      }
      let rotatedList = playerList.concat(finishedTeam);
      console.log(rotatedList)
      localStorage.setItem('players', JSON.stringify(rotatedList))

      return rotatedList;

    }
  )
  }

  const getPlayerPos = (id:UniqueIdentifier) => players?.findIndex(player => player.id === id)

  const handleDragEnd = (event:any) => {
    const {active, over} = event

    if (active.id === over?.id) return;

    setPlayers(players => {
      const originalPos = getPlayerPos(active.id);
      const newPos = getPlayerPos(over.id);

      localStorage.setItem('players', JSON.stringify(arrayMove(players!, originalPos!, newPos!)))
      return arrayMove(players!, originalPos!, newPos!)

    }

    )
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),


  )

  return (

    <div>
      <settingsContext.Provider value={ {settings, setSettings} }>
        <ScoreBoard teamOne={teamOne} teamTwo={teamTwo} teamNext={teamNext} gameLive={gameLive} setGameLive={gameToggle} rotatePlayers={rotatePlayers} setPlayers={setPlayers} updatePlayerRecord={updatePlayerRecord}/>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >

          <QuickBasketballPlayerList players={players} addPlayer={addPlayer} removePlayer={removePlayer} editPlayer={editPlayerName}/>
        </DndContext>
      </settingsContext.Provider>
    </div>
  );
}

export default QuickBasketballPage;