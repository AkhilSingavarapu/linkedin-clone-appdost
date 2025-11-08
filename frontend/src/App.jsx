// src/App.jsx
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
      {/* root - send user to feed if logged-in otherwise to login */}
      <Route path="/" element={token ? <Navigate to="/feed" /> : <Navigate to="/login" />} />

      {/* explicit login/signup routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected routes - redirect to /login if no token */}
      <Route path="/feed" element={token ? <Feed /> : <Navigate to="/login" />} />
      <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" />} />

      {/* optional: catch-all -> redirect to / */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
