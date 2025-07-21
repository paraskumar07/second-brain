const API_BASE = "http://localhost:3000/api/v1";

function getToken() {
  return localStorage.getItem("token");
}

export async function signup(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function signin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`, {
    headers: { "Authorization": "Bearer " + getToken() },
  });
  return res.json();
}

export async function addNote(note: {
  title: string;
  type: string;
  tags: string[];
  content?: string;
  link?: string;
}) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(id: string, update: {
  title: string;
  type: string;
  tags: string[];
  content?: string;
  link?: string;
}) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(update),
  });
  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + getToken() },
  });
  return res.json();
}
