import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [text, setText] = useState("");
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("name");
      await axios.post(`${API_BASE}/posts`, { userId, userName, text });
      nav("/feed");
    } catch (err) {
      alert(err.response?.data?.error || "Error creating post");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h3>Create Post</h3>
      <form onSubmit={handle}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows="4" cols="50" placeholder="What's on your mind?" required />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
