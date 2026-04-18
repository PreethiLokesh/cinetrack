import Navbar from "../components/Navbar"
import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./Home.module.css"

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`

  const fetchMovies = async (url) => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(url)
      setData(res.data.results)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // on first load — fetch popular movies
  useEffect(() => {
    fetchMovies(POPULAR_API)
  }, [])

  // every time query changes — fetch search or popular
  useEffect(() => {
    if (query === "") {
      fetchMovies(POPULAR_API)
    } else {
      fetchMovies(SEARCH_API)
    }
  }, [query])

  return (
    <>
      <Navbar />

      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>
          {query ? `Results for "${query}"` : "Popular Movies"}
        </h2>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <p className={styles.message}>Loading...</p>
      )}

      {error && (
        <p className={styles.error}>Something went wrong: {error}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className={styles.message}>No movies found for "{query}"</p>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {data.map((curElem) => (
            <MovieCard key={curElem.id} movieData={curElem} />
          ))}
        </div>
      )}
    </>
  )
}