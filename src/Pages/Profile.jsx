import { useContext, useState, useRef } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import Navbar from "../components/Navbar";
import styles from "./Profile.module.css";

const getSavedUser = () => {
  const saved = localStorage.getItem("cinetrack_user");
  if (saved) {
    const u = JSON.parse(saved);
    return { name: `${u.firstname} ${u.lastname}`, email: u.email };
  }
  return { name: "user", email: "" };
};

export default function Profile() {
  const { watchlist } = useContext(WatchlistContext);

  const [user, setUser] = useState(getSavedUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [confirmType, setConfirmType] = useState(null);
  const fileRef = useRef();

  /* ── Stats ── */
  const totalSaved = watchlist?.length || 0;
  const totalWatched = watchlist.filter((m) => m.watched).length;
  const totalUnwatched = totalSaved - totalWatched;

  /* ── Avg Rating ── */
  const ratedMovies = watchlist.filter((m) => m.rating > 0);
  const avgRating =
    ratedMovies.length > 0
      ? (
          ratedMovies.reduce((sum, m) => sum + m.rating, 0) /
          ratedMovies.length
        ).toFixed(1)
      : "N/A";

  /* ── Top Genre ── */
  const genreMap = {};
  watchlist.forEach((m) => {
    (m.genre_ids || []).forEach((id) => {
      genreMap[id] = (genreMap[id] || 0) + 1;
    });
  });
  const topGenreId = Object.keys(genreMap).sort(
    (a, b) => genreMap[b] - genreMap[a]
  )[0];
  const GENRE_NAMES = {
    28: "Action", 12: "Adventure", 16: "Animation",
    35: "Comedy", 18: "Drama", 14: "Fantasy",
  };
  const topGenre = topGenreId ? GENRE_NAMES[topGenreId] || "N/A" : "N/A";

  /* ── Favourites ── */
  const favourites = watchlist.filter((m) => m.favorite).slice(0, 6);

  /* ── Avatar ── */
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarSrc(URL.createObjectURL(file));
  };

  /* ── Profile Save ── */
  const saveProfile = () => {
    setUser({ ...user, ...form });
    setEditing(false);
  };

  /* ── Confirm Action ── */
  const confirmAction = () => {
    if (confirmType === "logout") {
      localStorage.removeItem("cinetrack_loggedin");
      window.location.href = "/login";
    } else if (confirmType === "delete") {
      localStorage.clear();
      window.location.href = "/";
    }
    setConfirmType(null);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        {/* PROFILE CARD */}
        <div className={styles.profileCard}>
          <div
            className={styles.avatarWrap}
            onClick={() => fileRef.current.click()}
          >
            {avatarSrc ? (
              <img src={avatarSrc} className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarInitials}>{initials}</div>
            )}
            <div className={styles.avatarOverlay}>📷</div>
            <input type="file" ref={fileRef} hidden onChange={handleAvatar} />
          </div>

          {editing ? (
            <div>
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
              <input
                className={styles.input}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
              />
              <div>
                <button className={styles.btnSave} onClick={saveProfile}>
                  Save
                </button>
                <button
                  className={styles.btnCancel}
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              <button
                className={styles.btnEdit}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>

              <div className={styles.accountActions}>
                <button
                  className={styles.logoutBtn}
                  onClick={() => setConfirmType("logout")}
                >
                  Logout
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setConfirmType("delete")}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>{totalSaved}</span>
            <p>Saved</p>
          </div>
          <div className={styles.statCard}>
            <span>{totalWatched}</span>
            <p>Watched</p>
          </div>
          <div className={styles.statCard}>
            <span>{totalUnwatched}</span>
            <p>To Watch</p>
          </div>
          <div className={styles.statCard}>
            <span>{avgRating}</span>
            <p>Avg Rating</p>
          </div>
          <div className={styles.statCard}>
            <span>{topGenre}</span>
            <p>Top Genre</p>
          </div>
        </div>

        {/* FAVOURITES */}
        <div className={styles.section}>
          <h3>Favourite Movies</h3>
          {favourites.length === 0 ? (
            <p className={styles.empty}>No favourites yet</p>
          ) : (
            <div className={styles.favGrid}>
              {favourites.map((m) => (
                <div key={m.id} className={styles.favCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                    className={styles.favPoster}
                  />
                  <div className={styles.favRating}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>{m.rating >= s ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className={styles.favTitle}>{m.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmType && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <h3>
              {confirmType === "logout"
                ? "Are you sure you want to logout?"
                : "Delete your account permanently?"}
            </h3>
            <div className={styles.confirmActions}>
              <button className={styles.btnConfirm} onClick={confirmAction}>
                Yes
              </button>
              <button
                className={styles.btnCancel}
                onClick={() => setConfirmType(null)}
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