const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function apiFetch(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let msg = "Request failed";
    try { const e = await res.json(); msg = e.message || msg; } catch {}
    throw new Error(msg);
  }

  if (res.status === 204) return { success: true };
  return await res.json();
}
