import React from "react";

export default function Leaderboard({ leaderboard }) {
  const sorted = Object.entries(leaderboard).sort((a, b) => {
    // Sort by wins (descending)
    if (b[1] !== a[1]) return b[1] - a[1];
    // If same wins → sort alphabetically (ascending)
    return a[0].localeCompare(b[0]);
  });

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  const getTextColor = (index) => {
    if (index === 0) return "text-yellow-400";
    if (index === 1) return "text-gray-300";
    if (index === 2) return "text-orange-400";
    return "text-white";
  };

  const getRowStyle = (index) => {
    if (index === 0)
      return "bg-gray-900 border border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] scale-[1.02]";
    return "bg-gray-800";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        🏆 Leaderboard
      </h2>

      {sorted.length > 0 ? (
        <ul className="w-full space-y-2">
          {sorted.map(([player, score], index) => (
            <li
              key={player}
              className={`flex justify-between items-center rounded-lg px-4 py-2 shadow-sm transition-all duration-500 ${getRowStyle(
                index
              )}`}
            >
              <span
                className={`flex items-center gap-2 font-medium ${getTextColor(
                  index
                )}`}
              >
                {getMedal(index)} {player}
              </span>
              <span className="text-yellow-400 font-semibold">
                {score} wins
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No scores yet</p>
      )}
    </div>
  );
}
