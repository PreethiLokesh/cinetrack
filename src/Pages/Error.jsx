import { useNavigate } from "react-router-dom"
import styles from "./Error.module.css"

export default function Error() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>

      <svg className={styles.reel} width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="42" fill="none" stroke="#888" strokeWidth="1.5"/>
        <circle cx="45" cy="45" r="28" fill="none" stroke="#888" strokeWidth="1"/>
        <circle cx="45" cy="45" r="6" fill="#888"/>
        <circle cx="45" cy="17" r="7" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="45" cy="73" r="7" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="17" cy="45" r="7" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="73" cy="45" r="7" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="24" cy="24" r="5" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="66" cy="24" r="5" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="24" cy="66" r="5" fill="#222" stroke="#888" strokeWidth="1"/>
        <circle cx="66" cy="66" r="5" fill="#222" stroke="#888" strokeWidth="1"/>
      </svg>

      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Scene not found</h2>
      <p className={styles.subtitle}>
        Looks like this page got lost in the cutting room.
       
      </p>

      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={() => navigate(-1)}>
          Go back
        </button>
        <button className={styles.btnPrimary} onClick={() => navigate("/home")}>
          Back to home
        </button>
      </div>

    </div>
  )
}