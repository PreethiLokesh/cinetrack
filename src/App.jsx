import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MyList from "./Pages/MyList";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Error from "./Pages/Error";

export default function App() {
  const isLoggedIn = localStorage.getItem("cinetrack_loggedin") === "true"

  return (
    <WatchlistProvider>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}