import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/feed" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
