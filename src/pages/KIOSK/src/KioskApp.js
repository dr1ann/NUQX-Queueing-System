import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import QueueNum from "./Pages/QueueNum";
import StartPage from "./Pages/StartPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/queue-num" element={<QueueNum />} />
      <Route path="/start-page" element={<StartPage />} />
    </Routes>
  );
}

export default App;
