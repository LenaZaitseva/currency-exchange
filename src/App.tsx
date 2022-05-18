import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, AllCurrencyExchange, HomePage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="all-exchange" element={<AllCurrencyExchange />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
