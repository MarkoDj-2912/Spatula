import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./styles/styles.scss"; // obavezno učitavanje glavnog SCSS-a

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
