import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./orbital/HomePage";
import GeneratePage from "./orbital/GeneratePage";
import ResultPage from "./orbital/ResultPage";
import { useEffect } from "react";
import { useState } from "react";

export default function Board() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*must be jsx </> instead of html component*/}
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/order" element={<orderPage />} />
        </Routes>
      </Router>
    </div>
  );
}
