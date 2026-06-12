import { useState, useEffect } from "react";
import { Badge, Btn, Spinner } from "../../components/ui";
import { apiFetch } from "../../utils/api";
import { MOCK_ROOMS } from "../../data/mockData";

export default function ViewRooms({ setPage, setPreselectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("GET", "/rooms").then(r => {
      setRooms(r?.data || MOCK_ROOMS);
      setLoading(false);
    });
  }, []);

  const filtered = rooms.filter(r => {
    const matchF = filter === "ALL" || r.status === filter;
    const q = search.toLowerCase();
    const matchQ = !q || r.roomName.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
    return matchF && matchQ;
  });

  return (
    <div style={{ padding: "32px 48px", minHeight: "calc(100vh-60px)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#0F172A" }}>Available Meeting Rooms</h1>
          <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{filtered.length} rooms found</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search rooms..."
            style={{ padding: "9px 16px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 13, background: "#fff", outline: "none", width: 220 }}
          />
          {["ALL", "AVAILABLE", "OCCUPIED", "RESERVED"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", borderRadius: 20, border: "1.5px solid", borderColor: filter === f ? "#1B2A6B" : "#E2E8F0", background: filter === f ? "#1B2A6B" : "#fff", color: filter === f ? "#fff" : "#64748B", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)", transition: "all .2s" }}>
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div style={{ padding: 60 }}><Spinner size={40} /></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}>
          {filtered.map((r, i) => (
            <div key={r.id} className="fade-up"
              style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "var(--shadow-sm)", transition: "transform .2s, box-shadow .2s", animationDelay: `${i * .06}s` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
              <div style={{ position: "relative" }}>
                <img src={r.image} alt={r.roomName} style={{ width: "100%", height: 160, objectFit: "cover" }} onError={e => e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"} />
                <div style={{ position: "absolute", top: 10, right: 10 }}><Badge status={r.status} /></div>
              </div>
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#0F172A", marginBottom: 8 }}>{r.roomName}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: "#64748B" }}>📍 {r.location}</span>
                  <span style={{ fontSize: 12, color: "#64748B" }}>👥 Capacity: {r.capacity} People</span>
                  {r.description && <span style={{ fontSize: 12, color: "#64748B" }}>ℹ️ {r.description}</span>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #F1F5F9" }}>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>ID #{r.id}</span>
                  <Btn variant="primary" size="sm" disabled={r.status !== "AVAILABLE"}
                    onClick={() => { setPreselectedRoom && setPreselectedRoom(r.id); setPage("bookRoom"); }}
                    style={{ borderRadius: 8 }}>
                    {r.status === "AVAILABLE" ? "Book Now →" : "Unavailable"}
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
