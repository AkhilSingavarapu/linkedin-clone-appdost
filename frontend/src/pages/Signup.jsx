import { API_BASE } from "../api";

// ... inside the signup function
const res = await fetch(`${API_BASE}/auth/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password })
});
