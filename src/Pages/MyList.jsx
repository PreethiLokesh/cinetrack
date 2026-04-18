import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import Navbar from "../components/Navbar";
import styles from "./MyList.module.css";
import emptyImg from "../assets/movies-app.png";
import { Eye, EyeOff, StickyNote, Heart, Trash2 } from "lucide-react";

const FILTERS = ["All", "Watched", "Unwatched"];

export default function MyList() {
  const {
    watchlist,
    removeFromWatchlist,
    toggleWatched,
    updateNote,
    updateRating,
    toggleFavorite,
  } = useContext(WatchlistContext);

  const [activeFilter, setActiveFilter] = useState("All");
  const [noteMovie, setNoteMovie] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [draggedId, setDraggedId] = useState(null);

  const list = watchlist;

  const filtered =
    activeFilter === "All"
      ? list
      : activeFilter === "Watched"
        ? list.filter((m) => m.watched)
        : list.filter((m) => !m.watched);

  const handleDragStart = (id) => setDraggedId(id);

  const openNote = (movie) => {
    setNoteMovie(movie);
    setNoteText(movie.note || "");
  };

  const saveNote = () => {
    updateNote(noteMovie.id, noteText);
    setNoteMovie(null);
  };

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Watchlist</h1>
          <p className={styles.subtitle}>
            {list.length} {list.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
              <span className={styles.filterCount}>
                {f === "All"
                  ? list.length
                  : f === "Watched"
                    ? list.filter((m) => m.watched).length
                    : list.filter((m) => !m.watched).length}
              </span>
            </button>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <img src={emptyImg} alt="No movies" className={styles.emptyImage} />
            <p>No movies here yet.</p>
            <a href="/home" className={styles.emptyLink}>
              Browse popular movies →
            </a>
          </div>
        )}

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((movie) => (
            <div
              key={movie.id}
              className={`${styles.card} ${movie.watched ? styles.cardWatched : ""} ${draggedId === movie.id ? styles.dragging : ""}`}
              draggable
              onDragStart={() => handleDragStart(movie.id)}
            >
              {/* Poster */}
              <div className={styles.posterWrap}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
                {movie.watched && (
                  <div className={styles.watchedBadge}>✓ Watched</div>
                )}
                <div className={styles.dragHandle}>⠿</div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>

                <div className={styles.meta}>
                  <span className={styles.year}>
                    {movie.release_date?.slice(0, 4)}
                  </span>
                  <span className={styles.rating}>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                {/* Star Rating */}
                <div className={styles.userRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`${styles.star} ${movie.rating >= star ? styles.starFilled : ""}`}
                      onClick={() => updateRating(movie.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* Note preview */}
                {movie.note && (
                  <p className={styles.notePreview}>{movie.note}</p>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  <button
                    className={`${styles.btn} ${styles.btnWatch} ${movie.watched ? styles.btnWatchDone : ""}`}
                    onClick={() => toggleWatched(movie.id)}
                  >
                    {movie.watched
                      ? <><Eye size={13} /> Watched</>
                      : <><EyeOff size={13} /> Mark Watched</>}
                  </button>

                  <button
                    className={`${styles.btn} ${styles.btnNote}`}
                    onClick={() => openNote(movie)}
                  >
                    <StickyNote size={13} /> Note
                  </button>

                  <button
                    className={`${styles.btn} ${styles.btnFav} ${movie.favorite ? styles.btnFavActive : ""}`}
                    onClick={() => toggleFavorite(movie.id)}
                  >
                    <Heart size={13} fill={movie.favorite ? "currentColor" : "none"} />
                    {movie.favorite ? "Favorited" : "Favorite"}
                  </button>

                  <button
                    className={`${styles.btn} ${styles.btnRemove}`}
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Modal */}
      {noteMovie && (
        <div className={styles.overlay} onClick={() => setNoteMovie(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Add a note</h3>
            <p className={styles.modalMovie}>{noteMovie.title}</p>

            <textarea
              className={styles.textarea}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your thoughts..."
              rows={4}
            />

            <div className={styles.modalActions}>
              <button className={styles.btnSave} onClick={saveNote}>
                Save
              </button>
              <button
                className={styles.btnCancel}
                onClick={() => setNoteMovie(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}