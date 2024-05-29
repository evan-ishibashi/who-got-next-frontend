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

function QuickBasketballPage() {
  const [players, setPlayers] = useState< Player[]>([]);


  useEffect(function setLocalStorage(): void {
    let stored = localStorage.getItem('players')
    if (stored) {
      setPlayers(JSON.parse(stored))
    }
  }, []);


  //Add Player to List
  const addPlayer = (name:String, idx:number) => {
    if(idx === players.length) {
      localStorage.setItem('players', JSON.stringify([...players, {id:players.length, name:name}]))
      setPlayers((players) => [...players, {id:players.length, name:name}]);

    } else {
      setPlayers(function (players) {

        let playerList =[...players];
        playerList.splice(idx, 0, {id:players.length, name:name});
        localStorage.setItem('players', JSON.stringify(playerList))

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

  //Pluck Team from Front of list
  const removeFinishedTeam = (count:number) => {
    let finishedTeam;
    setPlayers(function (players) {

      let playerList =[...players];
      finishedTeam = playerList.splice(0, count);
      localStorage.setItem('players', JSON.stringify(playerList))

      return playerList;
      })
    return finishedTeam;
  }

  // Append Returning Team to End of List
  const AppendReturningTeam = (players:Player[]) => {
    setPlayers(function (players) {

      let playerList =[...players].concat(players);

      localStorage.setItem('players', JSON.stringify(playerList))

      return playerList;
      });
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
      <ScoreBoard teamOne={players.slice(0,5)} teamTwo={players.slice(5,10)}/>
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