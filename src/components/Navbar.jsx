import watchlistimg from "../assets/movies-app.png"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar() {
  return (
    <header className={styles.navbar}>

      <div className={styles.logo}>
        <img src={watchlistimg} alt="watchlist-logo" />
        <h1>CineTrack</h1>
      </div>

      <nav className={styles.navLinks}>
        <Link to="/home">Home</Link>
        <Link to="/mylist">My List</Link>
        <Link to="/profile">Profile</Link>
      </nav>

    </header>
  )
}