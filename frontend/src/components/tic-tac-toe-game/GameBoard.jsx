import React, { useState } from "react";

export default function GameBoard({
  players,
  currentTurn,
  setCurrentTurn,
  updateLeaderboard,
  isGameStarted,
  setIsGameStarted,
  startGame,
  resetGame,
  nextGame,
}) {
  const emptyBoard = Array(3)
    .fill(null)
    .map(() => Array(3).fill(" "));

  const [board, setBoard] = useState(emptyBoard);
  const [winner, setWinner] = useState(null);

 const handleClick = (r, c) => {
    if (!isGameStarted || winner || board[r][c] !== " ") return;

    const symbol = currentTurn === players[0] ? "X" : "O";
    const newBoard = board.map((row, i) =>
      i === r ? row.map((cell, j) => (j === c ? symbol : cell)) : row
    );
    setBoard(newBoard);

    if (checkWinner(newBoard, symbol)) {
      setWinner(currentTurn);
      updateLeaderboard(currentTurn, players);
      setIsGameStarted(false);
    } else {
      const nextPlayer = currentTurn === players[0] ? players[1] : players[0];
      setCurrentTurn(nextPlayer);
    }
  };

  const checkWinner = (b, s) => {
    for (let i = 0; i < 3; i++) {
      if (b[i].every((c) => c === s)) return true;
      if ([b[0][i], b[1][i], b[2][i]].every((c) => c === s)) return true;
    }
    if ([b[0][0], b[1][1], b[2][2]].every((c) => c === s)) return true;
    if ([b[0][2], b[1][1], b[2][0]].every((c) => c === s)) return true;
    return false;
  };

  const resetBoard = () => {
    setBoard(emptyBoard);
    setWinner(null);
    resetGame();
    setIsGameStarted(false);
  };

  return (
    <div className="text-center">

      {players.length === 2 && (
        <h2 className="mb-4 text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg text-center">
          ⚔ Match: 
          <span className="player-name text-indigo-400 ml-2 text-shadow-lg text-shadow-indigo-700">{players[0]}</span> 
          {" "}vs{" "}
          <span className="player-name text-red-400 ml-2 text-shadow-lg text-shadow-red-700">{players[1]}</span>
        </h2>
      )}

      {winner ? (
        <h3 className="text-green-400 mb-4">🏆 {winner} Wins!</h3>
      ) : isGameStarted && players.length === 2 ? (
        <h3 className="mb-4 text-blue-300">Turn: {currentTurn}</h3>
      ) : (
        <h3 className="mb-4 text-gray-400">Press “Start Game” to begin</h3>
      )}

      {/* GAME GRID (Always visible) */}
      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-3 gap-2">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-20 h-20 text-2xl font-bold rounded-lg transition-colors duration-200 ${
                  cell === "X"
                    ? "bg-blue-600 text-white"
                    : cell === "O"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => handleClick(r, c)}
              >
                {cell}
              </button>
            ))
          )}
        </div>
      </div>

      {/* BUTTONS (Always visible) */}
      <div className="flex justify-center gap-4 mt-7">
        <button
          onClick={startGame}
          disabled={players.length < 2}
          className="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition disabled:bg-gray-500"
        >
          ▶️ Start Game
        </button>


        <button
          onClick={() => {
            resetBoard();  // clears the board and winner
            nextGame();    // loads next player pair
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition"
        >
          ➡️ Next Match
        </button>
      </div>
    </div>
  );
}
