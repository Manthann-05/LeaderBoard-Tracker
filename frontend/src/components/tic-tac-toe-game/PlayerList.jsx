import React, { useState, useEffect } from "react";

export default function PlayerList({
  players,
  addPlayer,
  setPlayers,
  leaderboard,
  setLeaderboard,
}) {
  const [newPlayer, setNewPlayer] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const handleAdd = () => {
    if (newPlayer.trim() !== "") {
      addPlayer(newPlayer.trim());
      setNewPlayer("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // 🧨 Delete player + leaderboard entry
  const handleDelete = (index) => {
    const playerToRemove = players[index];
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);

    setLeaderboard((prev) => {
      const updated = { ...prev };
      delete updated[playerToRemove];
      return updated;
    });

    setMenuOpen(null);
    setEditingIndex(null);
  };

  // ✏️ Start renaming mode
  const handleRename = (index) => {
    setEditingIndex(index);
    setRenameValue(players[index]);
    setMenuOpen(null);
  };

  // ✅ Confirm rename (update both players + leaderboard)
  const handleRenameSubmit = (index) => {
    const trimmed = renameValue.trim();
    if (!trimmed) return;

    const oldName = players[index];
    const updatedPlayers = [...players];
    updatedPlayers[index] = trimmed;
    setPlayers(updatedPlayers);

    // Update leaderboard entry name but keep win count
    setLeaderboard((prev) => {
      const updated = { ...prev };
      if (oldName in updated) {
        updated[trimmed] = updated[oldName];
        delete updated[oldName];
      } else {
        updated[trimmed] = 0;
      }
      return updated;
    });

    setEditingIndex(null);
    setRenameValue("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container")) {
        setMenuOpen(null);
        setEditingIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Header = () => (
    <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
      👤 Players
    </h2>
  );

  return (
    <div className="flex flex-col h-full justify-start overflow-hidden">
      <Header />

      <ul className="mb-4 grow overflow-y-auto space-y-2 pr-1 scrollbar-hide">
        {players.map((player, i) => (
          <li
            key={i}
            className={`flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2 shadow-sm transition-all duration-300 hover:bg-gray-700 relative ${
              menuOpen === i ? "z-50" : "z-10"
            } overflow-visible`}
          >
            {editingIndex === i ? (
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit(i);
                  if (e.key === "Escape") setEditingIndex(null);
                }}
                className="bg-gray-700 px-2 py-1 rounded border border-gray-600 w-32 focus:outline-none text-white"
                autoFocus
              />
            ) : (
              <span className="text-white font-medium">
                {i + 1}. {player}
              </span>
            )}

            <div className="relative menu-container z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === i ? null : i);
                }}
                className="text-gray-400 hover:text-white px-2"
              >
                ⋮
              </button>

              {menuOpen === i && (
                <div className="absolute right-0 top-8 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg shadow-black/40 z-50">
                  <button
                    onClick={() => handleRename(i)}
                    className="block w-full text-left px-3 py-1 hover:bg-gray-700"
                  >
                    ✏️ Rename
                  </button>

                  <button
                    onClick={() => handleDelete(i)}
                    className="block w-full text-left px-3 py-1 hover:bg-gray-700 text-red-400"
                  >
                    🗑️ Delete
                  </button>

                  <button
                    onClick={() => setMenuOpen(null)}
                    className="block w-full text-left px-3 py-1 hover:bg-gray-700"
                  >
                    ❌ Close
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex mt-auto">
        <input
          type="text"
          placeholder="Add player..."
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={handleKeyPress}
          className="grow px-2 py-1 rounded-l bg-gray-800 border border-gray-700 focus:outline-none text-white"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 px-4 py-1 rounded-r hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
