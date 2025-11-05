/**
 * ========================================================================
 * 🎯 PROJECT: ESport Arena LeaderBoard Tracker (React + Tailwind + Python)
 * ========================================================================
 * 
 * 🔍 DATA STRUCTURES & ALGORITHMS USED
 * ---------------------------------------------------------------
 * | No. | Data Structure / Algorithm | File / Function             | Purpose / Use Case                                              | Time Complexity |
 * |------|-----------------------------|------------------------------|-----------------------------------------------------------------|-----------------|
 * | 1️⃣ | Array                        | App.jsx → players[]          | Stores dynamic list of player names                             | Access: O(1), Insert/Delete: O(n) |
 * | 2️⃣ | Nested Array (2D Matrix)     | GameBoard.jsx → board[][]    | Represents 3×3 game grid for Tic Tac Toe                        | Access: O(1), Traversal: O(n²) |
 * | 3️⃣ | Object (Hash Map)            | App.jsx → leaderboard{}      | Tracks each player's total wins (key = name, value = score)     | Insert/Update/Lookup: O(1) |
 * | 4️⃣ | Array of Pairs (Tuples)      | App.jsx → matches[]          | Holds all unique player matchups e.g., [“Alice”, “Bob”]         | Generation: O(n²), Access: O(1) |
 * | 5️⃣ | Queue-like Access Pattern    | App.jsx → nextGame()         | Sequentially cycles through player pairs (circular queue)       | Enqueue/Dequeue: O(1) |
 * | 6️⃣ | Sorting Algorithm (Built-in) | Leaderboard.jsx → sorted()    | Sorts leaderboard by wins (desc) & names (asc)                  | O(n log n) |
 * | 7️⃣ | Combination Generation Loop  | App.jsx → useEffect(players) | Generates all 2-player combinations using nested loops          | O(n²) |
 * | 8️⃣ | Filtering / Mapping          | PlayerList.jsx → handleDelete(), handleRename() | Updates player list & leaderboard dynamically        | O(n) |
 * | 9️⃣  | State Management (React Hooks)| All Components               | Stores and updates UI states efficiently                        | O(1) average |
 * ---------------------------------------------------------------
 * 
 * 🧩 Additional Concepts:
 * - Circular Match Flow (looping through all pairs) → queue-like logic.
 * - Unique Player Names → ensured via HashMap keys (conceptual Set).
 * - Sorting Stability → ensures same-win players are alphabetically ordered.
 * 
 * 🕒 Overall Efficiency:
 * - Player management: O(n)
 * - Match generation: O(n²)
 * - Gameplay logic: O(1)
 * - Leaderboard sorting (after updates): O(n log n)
 * 
 * ================================================================
 * ⚙️ SUMMARY:
 * Your project effectively applies core data structures:
 * ➤ Arrays
 * ➤ 2D Matrices
 * ➤ Hash Maps (Objects)
 * ➤ Queues (conceptually)
 * ➤ Sorting & Search algorithms
 * demonstrating both theoretical understanding and practical application.
 * ================================================================
 */

import React, { useState, useEffect } from "react";
import PlayerList from "./components/tic-tac-toe-game/PlayerList";
import GameBoard from "./components/tic-tac-toe-game/GameBoard";
import Leaderboard from "./components/tic-tac-toe-game/Leaderboard";
import Header from "./components/tic-tac-toe-game/Header";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState({});
  const [currentTurn, setCurrentTurn] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState([]);

  // 🟢 Add player + initialize in leaderboard
  const addPlayer = (name) => {
    setPlayers((prev) => {
      const updatedPlayers = [...prev, name];
      setLeaderboard((prevBoard) => {
        const newBoard = { ...prevBoard };
        if (!(name in newBoard)) newBoard[name] = 0;
        return newBoard;
      });
      return updatedPlayers;
    });
  };

  // 🧮 Generate all unique match pairs whenever players change
  useEffect(() => {
    if (players.length >= 2) {
      const pairs = [];
      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          pairs.push([players[i], players[j]]);
        }
      }
      setMatches(pairs);
      setMatchIndex(0);
      setCurrentMatch(pairs[0] || []);
    } else {
      setMatches([]);
      setCurrentMatch([]);
      setIsGameStarted(false);
    }
  }, [players]);

  // 🛑 Handle if a player is deleted mid-match
  useEffect(() => {
    if (currentMatch.length === 0) return;

    const invalidPlayer = currentMatch.some((p) => !players.includes(p));
    if (invalidPlayer) {
      // ❌ Reset current game
      setIsGameStarted(false);
      setCurrentTurn(null);

      // 🧹 Remove invalid match and rebuild remaining matches
      const validPlayers = [...players];
      if (validPlayers.length >= 2) {
        const newPairs = [];
        for (let i = 0; i < validPlayers.length; i++) {
          for (let j = i + 1; j < validPlayers.length; j++) {
            newPairs.push([validPlayers[i], validPlayers[j]]);
          }
        }

        // Move to the next match safely
        const nextIndex = matchIndex + 1 >= newPairs.length ? 0 : matchIndex + 1;
        setMatches(newPairs);
        setMatchIndex(nextIndex);
        setCurrentMatch(newPairs[nextIndex]);
      } else {
        // ⛔ Not enough players left to continue
        setMatches([]);
        setCurrentMatch([]);
      }
    }
  }, [players]);

  // 🏆 Update leaderboard after each match
  const updateLeaderboard = (winner, matchPlayers) => {
    setLeaderboard((prev) => {
      const updated = { ...prev };
      matchPlayers.forEach((p) => {
        if (!(p in updated)) updated[p] = 0;
      });
      if (winner) updated[winner] = (updated[winner] || 0) + 1;
      return updated;
    });

    setIsGameStarted(false);
    setCurrentTurn(null);
  };

  // ▶️ Start a new match
  const startGame = () => {
    if (currentMatch.length < 2 || currentMatch.some((p) => !players.includes(p))) {
      alert("⚠️ Need 2 valid players to start the game!");
      setIsGameStarted(false);
      setCurrentTurn(null);
      return;
    }
    setIsGameStarted(true);
    setCurrentTurn(currentMatch[0]);
  };

  // 🔁 Move to the next match
  const nextGame = () => {
    if (!matches.length) return;
    let nextIndex = matchIndex + 1;
    if (nextIndex >= matches.length) nextIndex = 0;

    setMatchIndex(nextIndex);
    setCurrentMatch(matches[nextIndex]);
    setIsGameStarted(false);
    setCurrentTurn(null);
  };

  // ⏹ Reset current match
  const resetGame = () => {
    setIsGameStarted(false);
    setCurrentTurn(null);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="py-4 border-b border-gray-700 text-center">
        <Header />
      </div>

      <div className="flex grow">
        {/* LEFT PANEL */}
        <div className="w-1/4 p-4 border-r border-gray-700 flex flex-col justify-center">
          <PlayerList
            players={players}
            addPlayer={addPlayer}
            setPlayers={setPlayers}
            leaderboard={leaderboard}
            setLeaderboard={setLeaderboard}
          />
        </div>

        {/* CENTER PANEL */}
        <div className="w-2/4 p-6 flex flex-col items-center justify-center">
          <GameBoard
            players={currentMatch}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
            updateLeaderboard={updateLeaderboard}
            isGameStarted={isGameStarted}
            setIsGameStarted={setIsGameStarted}
            startGame={startGame}
            resetGame={resetGame}
            nextGame={nextGame}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/4 p-4 border-l border-gray-700">
          <Leaderboard leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}