import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import InitialSignUp from "../authentication/InitialSignUp";
import FinalSignUp from "../authentication/FinalSignUp";
import HomePage from "./homepage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/initial_signup" element={<InitialSignUp />} />
        <Route path="/:user_uid/final_signup" element={<FinalSignUp />} />
        <Route path="/:user_uid/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
