// frontend/src/pages/CreatePost.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function CreatePost() {
  const [text, setText] = useState("");
  const nav = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || data.error || "Create post failed");
        return;
      }
      // after create, go back to feed
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Create post error");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Create Post</h2>
      <form onSubmit={handleCreate}>
        <div>
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            required
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
