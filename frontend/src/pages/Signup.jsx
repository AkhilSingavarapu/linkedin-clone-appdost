// frontend/src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        // show server message if any
        alert(data.message || data.error || "Signup failed");
        return;
      }

      // If backend returns token, save and redirect to feed
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      nav("/"); // go to feed or home
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
