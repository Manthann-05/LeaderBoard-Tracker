<div align="center">

# 🎮 ESport Arena LeaderBoard Tracker

### *Dynamic, Interactive LeaderBoard for Competitive Gaming with React, Tailwind, and Python Backend*

**Track player rankings, wins, and matches seamlessly with elegant UI and robust algorithms powering your esports competitions!**

[📝 Features](#-features) - [📸 Demo](#-demo) - [⚡ Quick Start](#-quick-start) - [💻 Tech Stack](#-tech-stack) - [👥 Team](#-team)

</div>

## 🎯 Why ESport Arena LeaderBoard?

Experience a real-time competitive edge with a leaderboard system engineered for esports tournaments. Combining a fluid React frontend, modern TailwindCSS design, and a Python backend, ESport Arena LeaderBoard offers accuracy, speed, and an engaging user experience to follow all player stats and match outcomes.

| ⚙️ Efficient Algorithms | 🎨 Responsive UI | 📊 Insightful Stats |
|------------------------|------------------|-------------------|
| Optimized sorting, queue flow, and hash maps | Clean, intuitive leaderboard with Tailwind CSS styling | Real-time ranking updates and match tracking |

## ✨ Features

### 🏆 LeaderBoard Management
- **Dynamic Player List**: Add, rename, and delete players effortlessly
- **Automated Match Generation**: All unique pairs for head-to-head play
- **Circular Match Flow**: Queue-like system cycling through matches seamlessly
- **Ranking Sort**: Multi-criteria sorting (wins descending, name ascending) with stability
- **Real-Time Updates**: Score and leaderboard update immediately with gameplay

### 🧮 Data Structures & Algorithms
- Utilizes arrays, 2D matrices (for game boards), hash maps (for scores), and queues for efficient matchmaking
- Combination generation with nested loops for unique player matches
- Sorting with O(n log n) complexity ensures fast leaderboard refreshes

### 🎨 UI Design & Experience
- Fully responsive React app styled with Tailwind CSS
- Intuitive interface showcasing player stats and matches clearly
- Interactive player management and scoreboard components

### ⚡ Performance & Scalability
- Handles dynamic player additions and up to thousands of matches fluidly
- Rapid state updates with React hooks and optimized algorithms
- Modular, maintainable code architecture for easy feature expansion

## 📸 Demo

<div align="center">

![Landing Page](https://github.com/Manthann-05/LeaderBoard-Tracker/blob/main/images/landing-page.png)

![Gameplay Interface](https://github.com/Manthann-05/LeaderBoard-Tracker/blob/main/images/tic-tac-toe-esport-game.png)

<em>Clean gameplay interface with leaderboard and match flow</em>

</div>

# ⚡ Quick Start

## 🧩 Prerequisites
- **Node.js** & **npm**
- **Python 3.x**

---

## 🚀 Installation Steps

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Manthann-05/LeaderBoard-Tracker.git
cd LeaderBoard-Tracker

cd backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py                   # Run Python backend server

cd ../frontend
npm install
npm start                       # Run React frontend
```

## 💻 Tech Stack

| Layer          | Technology           | Purpose                           |
|----------------|---------------------|---------------------------------|
| Frontend       | React + Tailwind CSS | Dynamic UI & responsive design  |
| Backend        | Python Flask/FastAPI | API and leaderboard logic       |
| Data Storage   | In-memory Data Storage | Player and match data persistence |

## 📁 Project Structure

```bash
LeaderBoard_Tracker/
├── backend/                     # Python backend (Flask or FastAPI logic)
│   ├── __pycache__/             # Cached Python bytecode
│   └── main.py                  # Main backend server file
│
├── frontend/                    # React + Tailwind frontend
│   ├── src/
│   │   ├── assets/              # Images, icons, and static assets
│   │   ├── components/
│   │   │   ├── landing-page/
│   │   │   │   ├── LandingPage.css
│   │   │   │   └── LandingPage.jsx
│   │   │   └── tic-tac-toe-game/
│   │   │       ├── GameBoard.jsx
│   │   │       ├── Header.jsx
│   │   │       ├── Leaderboard.jsx
│   │   │       └── PlayerList.jsx
│   │   ├── App.jsx
│   │   ├── GameApp.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── node_modules/
│   ├── eslint.config.js
│   └── index.html
│
├── images/                      # Screenshots or documentation media
├── .gitignore                   # Git ignore file
└── README.md                    # Project documentation
```

## 👥 Team

| 👨‍💻 Developer 1       | 👨‍💻 Developer 2          | 👨‍💻 Developer 3          |
|-----------------------|-----------------------|-----------------------|
| Manthan Kadu (API, Backend Logic) | Yug Jain (React UI, Frontend) | Tanisha Jain (React UI, Frontend) |

**Built with ❤️ by ESport Arena development team**


## 📈 Roadmap

✅ **Core leaderboard and player management**  
✅ **Match generation & circular queue flow**  
✅ **Responsive frontend with React & Tailwind**  
🔄 **Integration with live game data feeds**  
📱 **Mobile app support**  
📊 **Advanced analytics & historical stats**  
🤝 **Collaborative multiplayer features**


## 🤝 Contributing

Contributions are welcome!  
If you'd like to improve this project, feel free to **fork the repository**, make changes, and open a **pull request**.

## 📞 Contact & Support

Found a bug? Report it on the GitHub issues page or reach out via email.

