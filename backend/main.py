from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to access backend (important!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change * to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Data Structures
players = []            
leaderboard = {}       
matches = []            
match_index = 0        
current_match = []     
@app.get("/state")
def get_state():
    """Send current game data to frontend."""
    return {
        "players": players,
        "leaderboard": _get_sorted_leaderboard(),
        "current_match": current_match,
    }

@app.post("/add_player/{name}")
def add_player(name: str):
    """Add a new player."""
    if name not in players:
        players.append(name)
        leaderboard[name] = leaderboard.get(name, 0)
        _generate_matches()
    return {"players": players, "leaderboard": _get_sorted_leaderboard()}

@app.delete("/delete_player/{name}")
def delete_player(name: str):
    """Delete a player and their score."""
    if name in players:
        players.remove(name)
        leaderboard.pop(name, None)
        _generate_matches()
    return {"players": players, "leaderboard": _get_sorted_leaderboard()}

@app.post("/record_winner/{winner}")
def record_winner(winner: str):
    """Increase the winner's score and move to next match."""
    if winner in leaderboard:
        leaderboard[winner] += 1
    _next_match()
    return {
        "leaderboard": _get_sorted_leaderboard(),
        "current_match": current_match
    }

# 🔁 Generate all player match combinations
def _generate_matches():
    global matches, match_index, current_match
    matches = []
    for i in range(len(players)):
        for j in range(i + 1, len(players)):
            matches.append([players[i], players[j]])
    match_index = 0
    current_match = matches[0] if matches else []

# 🔄 Move to next match (loops forever)
def _next_match():
    global match_index, current_match
    if not matches:
        current_match = []
        return
    match_index = (match_index + 1) % len(matches)
    current_match = matches[match_index]

# 🏆 Sort leaderboard before returning
def _get_sorted_leaderboard():
    """Sort leaderboard by wins (desc) then by name (asc)."""
    sorted_items = sorted(leaderboard.items(), key=lambda x: (-x[1], x[0]))
    return dict(sorted_items)
