# 🎬 CineTrack

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern movie watchlist app — discover, track, rate, and organise your films.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Screenshots](#-screenshots) · [Future Improvements](#-future-improvements) 
</div>

---

##  Features

###  Movie Discovery
- Browse popular and trending movies powered by the TMDB API
- Search movies instantly by title

###  Watchlist Management
- Add and remove movies from your personal watchlist
- Toggle movies between watched and unwatched
- Mark favourites and filter them in a dedicated view

###  Personalisation
- Rate movies with a 5-star system
- Attach personal notes to any movie
- View at-a-glance stats: total saved, watched count, average rating, and top genre

###  User System
- Sign up and log in with a simple auth flow
- Persistent sessions via `localStorage`
- Profile page with a generated initials avatar

---

##  Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router DOM |
| State Management | Context API |
| Styling | CSS Modules |
| Data Source | TMDB API |
| Persistence | localStorage |
| Build Tool | Vite |

---

##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/PreethiLokesh/cinetrack.git
cd cinetrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

> Get your free API key at  https://www.themoviedb.org/settings/api

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
cinetrack/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top navigation bar
│   │   ├── Navbar.jsx       # Bottom/side navigation
│   │   └── MovieCard.jsx    # Reusable movie card component
│   ├── context/
│   │   └── WatchlistContext.jsx  # Global state for watchlist & user
│   ├── pages/
│   │   ├── Home.jsx         # Movie discovery & search
│   │   ├── Detail.jsx       # Individual movie detail view
│   │   ├── MyList.jsx       # Personal watchlist page
│   │   ├── Profile.jsx      # User profile & stats
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Registration page
│   │   ├── Settings.jsx     # App settings
│   │   └── Error.jsx        # Custom 404 page
│   ├── App.jsx
│   └── main.jsx
├── .env                     # Environment variables (not committed)
├── .gitignore
├── package.json
└── vite.config.js
```

---

##  Screenshots

| Home | Movie Details |
|---|---|
| ![Home](screenshots/home.png) | ![Movie Details](screenshots/movieDetails.png) |

| My List | Profile |
|---|---|
| ![My List](screenshots/myList.png) | ![Profile](screenshots/profile.png) |

| Login | Signup |
|---|---|
| ![Login](screenshots/login.png) | ![Signup](screenshots/signup.png) |

| Error Page |
|---|
| <img src="screenshots/errorPage.png" width="500"/> |

---

##  Future Improvements

- [ ] Backend authentication (Firebase or Node.js + JWT)
- [ ] Cloud database for persistent watchlist storage
- [ ] Trailer integration via YouTube API
- [ ] Movie recommendation engine
- [ ] Social watchlist sharing
- [ ] TV show support
- [ ] Dark / light theme toggle

---

##  Notes

- This project uses `localStorage` for authentication and data persistence — no backend is involved.
- It is intended for **learning and demo purposes** only and is not production-ready.
  
---

##  License

This project is licensed under the [MIT License](LICENSE).

---

##  Acknowledgements

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie database and API
- The React ecosystem for excellent developer tooling

---

<div align="center">

Built with ❤️ by [Preethi Lokesh](https://github.com/PreethiLokesh)

</div>
