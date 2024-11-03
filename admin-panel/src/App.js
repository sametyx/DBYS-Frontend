import "./CSS/main.scss";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import FacultiesOLD from "./Components/Pages/Faculties/FacultiesOLD.jsx";
import LessonsOLD from "./Components/Pages/Lessons/LessonsOLD";
import Teachers from "./Components/Pages/Teachers/Teachers";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header />
      <div className="navbar-content">
        <Navbar />
        <Teachers />
      </div>
    </div>
  );
}

export default App;
