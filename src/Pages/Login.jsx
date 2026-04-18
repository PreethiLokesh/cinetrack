import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/Header"
import styles from "./Login.module.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e) {
  e.preventDefault()

  if (!email || !password) {
    alert("Please fill all fields")
    return
  }

  // check if user exists in localStorage
  const saved = localStorage.getItem("cinetrack_user")
  if (!saved) {
    alert("No account found. Please sign up first.")
    return
  }

  const user = JSON.parse(saved)

  if (user.email !== email || user.password !== password) {
    alert("Incorrect email or password.")
    return
  }

  // mark as logged in
  localStorage.setItem("cinetrack_loggedin", "true")
  navigate("/home")
}

  function handleGoogleLogin() {
    alert("Google login coming soon..")
  }

  function handleForgotPassword() {
    alert("Forgot password feature coming soon..")
  }

  return (
    <>
      <Header />

      <div className={styles.container}>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>

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

          {/* FIXED */}
          <p 
            className={styles.forgot} 
            onClick={handleForgotPassword}
            style={{ cursor: "pointer" }}
          >
            Forgot password?
          </p>

          <button type="submit" className={styles.btnPrimary}>
            Sign in
          </button>

          <p className={styles.divider}>or continue with</p>

          {/* FIXED */}
          <button 
            type="button" 
            className={styles.btnGoogle}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <p className={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.signupLink}>
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </>
  )
}