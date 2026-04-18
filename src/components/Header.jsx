
import watchlistimg from "../assets/movies-app.png"

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 24px",
        borderBottom: "1px solid #2a2a2a",
        backgroundColor: "#141414",
      }}
    >
      <img
        style={{
          height: "40px",
          width: "40px",
          filter: "brightness(0.9) contrast(1.1)"
        }}
        src={watchlistimg}
        alt="watchlist-logo"
      />

      <h1
        style={{
          fontSize: "22px",
          fontWeight: "500",
          color: "#e5e5e5",
          letterSpacing: "0.5px",
          marginTop: "15px",
          padding: "0"
        }}
      >
        CineTrack
      </h1>
    </header>
  )
}