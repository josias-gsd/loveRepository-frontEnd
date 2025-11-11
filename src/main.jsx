import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Tela from "./pages/home/tela.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          //<Route path="/tela" element={<Tela />} />
        }
        <Route path="/tela/:id" element={<Tela />} />{" "}
        {/* registro específico */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
