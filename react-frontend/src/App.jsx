import { useEffect, useState } from "react";
import "./App.css";

import LoginButton from "./components/LoginButton";
//import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        <Navbar />
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Test" element={<Test />} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
}

export default App;
