import { createContext, useState, useEffect } from "react";  
export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {         
    const saved = localStorage.getItem("cinetrack_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {                                         
    localStorage.setItem("cinetrack_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev
        : [...prev, { ...movie, watched: false, note: "", rating: 0, favorite: false }]
    );
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleWatched = (id) => {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m))
    );
  };

  const updateNote = (id, note) => {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, note } : m))
    );
  };

  const updateRating = (id, rating) => {
    setWatchlist((prev) =>
      prev.map((m) => m.id === id ? { ...m, rating: m.rating === rating ? 0 : rating } : m)
    );
  };

  const toggleFavorite = (id) => {
    setWatchlist((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, toggleWatched, updateNote, updateRating, toggleFavorite }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}