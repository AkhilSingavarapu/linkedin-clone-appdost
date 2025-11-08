import { API_BASE } from "../api";

// ... inside create post function
const res = await fetch(`${API_BASE}/posts`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // if your app uses token
  },
  body: JSON.stringify({ text })
});
