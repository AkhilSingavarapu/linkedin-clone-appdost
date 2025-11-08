// frontend/src/pages/Feed.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
      return;
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Feed</h1>
        <div>
          <Link to="/create">Create Post</Link>
          {" | "}
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        {posts.length === 0 && <p>No posts yet.</p>}
        {posts.map((p) => (
          <div key={p._id || p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: "bold" }}>{p.userName || p.user?.name || "Unknown"}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{new Date(p.createdAt || p.created || Date.now()).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>{p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
