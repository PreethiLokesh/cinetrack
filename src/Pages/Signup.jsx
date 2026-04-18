import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/Header"
import styles from "./Signup.module.css"

export default function Signup() {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    // simple validation
    if (!firstname || !lastname || !email || !password) {
      alert("Please fill all fields")
      return
    }

    // store in localStorage (temporary database)
    const user = { firstname, lastname, email, password }
    localStorage.setItem("cinetrack_user", JSON.stringify(user))

    console.log("User Saved:", user)

    // redirect to login
    navigate("/login")
  }

  return (
    <>
      <Header />
      <div className={styles.container}>

        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Your details</p>

        <form onSubmit={handleSubmit}>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>First Name</label>
            <input
              className={styles.input}
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.btnPrimary}>
            Continue
          </button>

          <p className={styles.signinText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.signinLink}>
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </>
  )
}