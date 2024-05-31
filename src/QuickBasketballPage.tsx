import { useEffect, useState } from 'react';
import QuickBasketballPlayerList from './QuickBasketballPlayerList';
import { DndContext, PointerSensor, UniqueIdentifier, closestCorners, useSensors, useSensor, TouchSensor, KeyboardSensor } from '@dnd-kit/core';
import Player from './types'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ScoreBoard from './Scoreboard';


/** BasketballQuickPage:
 *
 * State:
 *
 */

const TEAMSIZE = 5;

function QuickBasketballPage() {
  const [players, setPlayers] = useState< Player[]>([]);
  const [gameLive, setGameLive] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<number>(1);

  let teamOne = players.slice(0,TEAMSIZE);
  let teamTwo = players.slice(TEAMSIZE, TEAMSIZE * 2);
  let teamNext = players.slice(TEAMSIZE * 2, TEAMSIZE * 3);


  useEffect(function setLocalStorage(): void {
    let players = localStorage.getItem('players');
    let playerId = localStorage.getItem('playerId');
    if (players) setPlayers(JSON.parse(players));
    if (playerId) setPlayerId(JSON.parse(playerId));

  }, []);

  //Toggles Game Live from True/False
  const gameToggle = () => {
    setGameLive((gameLive) => !gameLive);
  }


  //Add Player to List
  const addPlayer = (name:String, idx:number) => {
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

// rotates Teams: input rotating Team === 'first', 'second', or 'both'
  const rotatePlayers = (rotatingTeam:string) => {
    console.log('Team Rotated off', rotatingTeam)
    if(rotatingTeam === 'none') return;

    let finishedTeam:Player[];

      setPlayers(function (players) {

      let playerList =[...players];

      if(rotatingTeam === "first"){
        finishedTeam = playerList.splice(0, TEAMSIZE);
      } else if(rotatingTeam === 'second') {
        finishedTeam = playerList.splice(TEAMSIZE, TEAMSIZE);
      } else if (rotatingTeam === 'both') {
        finishedTeam = playerList.splice(0, TEAMSIZE * 2);
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
      <ScoreBoard teamOne={teamOne} teamTwo={teamTwo} teamNext={teamNext} gameLive={gameLive} setGameLive={gameToggle} rotatePlayers={rotatePlayers} setPlayers={setPlayers}/>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >

        <QuickBasketballPlayerList players={players} addPlayer={addPlayer} removePlayer={removePlayer}/>
      </DndContext>
    </div>
  );
}

export default QuickBasketballPage;