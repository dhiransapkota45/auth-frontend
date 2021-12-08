import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import State from "./Contexts/State";

function App() {
  return (
    <div className="App">
      <State>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      </State>
    </div>
  );
}

export default App;
