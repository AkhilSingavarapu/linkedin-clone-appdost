import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { nav("/"); return; }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Feed</h2>
        <div>
          <span>{localStorage.getItem("name")}</span>
          <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>
          <Link to="/create" style={{ marginLeft: 10 }}>Create Post</Link>
        </div>
      </div>

      {posts.map(p => (
        <div key={p._id} style={{ border: "1px solid #ddd", padding: 12, marginTop: 10 }}>
          <div style={{ fontWeight: 600 }}>{p.userName || "Unknown"}</div>
          <div style={{ color: "#555" }}>{new Date(p.createdAt).toLocaleString()}</div>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}
