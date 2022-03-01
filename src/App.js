import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "regenerator-runtime/runtime";
import Home from "../components/Home/Home";
import LeaderBoard from "../components/Leaderboard/Leaderboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/leaderboard" element={<LeaderBoard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
