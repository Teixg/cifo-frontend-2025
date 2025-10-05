# Playlitics

Playlitics is a web application that provides insights and analytics for Steam gamers. View your game library, achievements, and playtime statistics in a clean, interactive dashboard.

---

## 🚀 Features

- **Steam ID Input:** Enter your Steam ID to view your personal stats.
- **Game Gallery:** Browse your owned games with sorting and pagination.
- **Game Details:** See achievements, playtime, and progress for each game.
- **Responsive Design:** Works on desktop and mobile devices.
- **Unified Error Handling:** All errors are displayed with a consistent style and animation.

---

## 📁 Project Structure

```
pf/
│
├── index.html         # Main landing page
├── gallery.html       # Game gallery page
├── game.html          # Game details page
│
├── main.js            # Entry JS for index.html
│
├── assets/            # Images and icons
│   ├── favicon.ico
│   └── logo.png
│
├── modules/           # JavaScript modules
│   ├── errorHandler.js
│   ├── gallery.js
│   ├── game.js
│   ├── listGames.js
│   ├── pagination.js
│   ├── sortGames.js
│   └── userData.js
│
└── styles/            # CSS files
    ├── styles.css
    ├── index.css
    ├── gallery.css
    └── game.css
```

---

## ⚙️ How to Use

1. **Clone the repository** and open the `pf` folder.
2. **Start your local backend proxy** (required for Steam API requests- CORS-ANYWHERE).
3. **Open `index.html` in your browser.**
4. **Enter your Steam ID** and explore your stats!

---

## 🛠️ Technologies

- HTML5, CSS3 (Bootstrap for layout)
- JavaScript (ES6 modules)
- Steam Web API

---

## 📋 Notes

- Your Steam profile must be **public** for stats to be visible.
- All error messages use a unified style for clarity.
- For best results, use the latest version of Chrome, Firefox, or Edge.

---

## 👤 Author

Developed by Teix  
© 2025 Playlitics. All rights reserved.
