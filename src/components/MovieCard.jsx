import { Link } from "react-router-dom"
import styles from "./MovieCard.module.css"

export default function MovieCard({ movieData }) {
  const { poster_path, backdrop_path, id, title, vote_average, release_date } = movieData

  const imagePath = poster_path || backdrop_path

  return (
    <div className={styles.card}>
      <img
        className={styles.poster}
        src={
          imagePath
            ? `https://image.tmdb.org/t/p/w500${imagePath}`
            : "https://via.placeholder.com/300"
        }
        alt={title}
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {vote_average?.toFixed(1)}</span>
          <span className={styles.year}>{release_date?.slice(0, 4)}</span>
        </div>
        <Link to={`/detail/${id}`} className={styles.link}>
          <button className={styles.btn}>View details</button>
        </Link>
      </div>
    </div>
  )
}