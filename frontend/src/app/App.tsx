import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import InitialSignUp from "../authentication/InitialSignUp";
import FinalSignUp from "../authentication/FinalSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/initial_signup" element={<InitialSignUp />} />
        <Route path="/final_signup" element={<FinalSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
