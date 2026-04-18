import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import styles from "./Detail.module.css"
import { WatchlistContext } from "../context/WatchlistContext"

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { watchlist, addToWatchlist } = useContext(WatchlistContext)

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
        setMovie(res.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) return <p className={styles.message}>Loading...</p>
  if (error)   return <p className={styles.message}>Something went wrong: {error}</p>
  if (!movie)  return null

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    runtime,
    genres,
    genre_ids,
  } = movie

  const isInWatchlist = watchlist.some((m) => m.id === movie.id)

  const handleWatchlist = () => {
    if (!isInWatchlist) {
      addToWatchlist({
        id: movie.id,
        title,
        poster_path,
        vote_average,
        release_date,
        genre_ids: genre_ids || genres?.map((g) => g.id) || [],
      })
    }
  }

  return (
    <>
      <Navbar />

      <div
        className={styles.backdrop}
        style={{
          backgroundImage: backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
            : "none",
        }}
      >
        <div className={styles.backdropOverlay} />
      </div>

      <div className={styles.container}>

        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div className={styles.content}>

          <img
            className={styles.poster}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={title}
          />

          <div className={styles.info}>

            <h1 className={styles.title}>{title}</h1>

            <div className={styles.metaRow}>
              <span className={styles.rating}>
                ⭐ {vote_average?.toFixed(1)}
              </span>
              <span className={styles.dot}>·</span>
              <span className={styles.meta}>
                {release_date?.slice(0, 4)}
              </span>
              <span className={styles.dot}>·</span>
              <span className={styles.meta}>
                {runtime} min
              </span>
            </div>

            <div className={styles.genres}>
              {genres?.map((g) => (
                <span key={g.id} className={styles.genre}>
                  {g.name}
                </span>
              ))}
            </div>

            <p className={styles.overview}>{overview}</p>

            <button
              className={`${styles.watchlistBtn} ${isInWatchlist ? styles.watchlistBtnAdded : ""}`}
              onClick={handleWatchlist}
              disabled={isInWatchlist}
            >
              {isInWatchlist ? "✓ Added to Watchlist" : "+ Add to Watchlist"}
            </button>

          </div>
        </div>
      </div>
    </>
  )
}