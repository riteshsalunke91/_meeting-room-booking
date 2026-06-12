import { useAuth } from "../../context/AuthContext";
import { Badge, Btn } from "../ui";

export default function Navbar({ page, setPage }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  const links = isAdmin
    ? [["Dashboard", "adminDashboard"], ["Add Room", "addRoom"], ["Manage Rooms", "manageRooms"]]
    : [["Dashboard", "dashboard"], ["View Rooms", "viewRooms"], ["Book Room", "bookRoom"], ["Booking History", "bookingHistory"], ["Account", "account"]];

  const handleLogout = () => {
    logout();
    setPage("login");
  };

  return (
    <nav style={{
      background: "#1B2A6B", height: 60, display: "flex", alignItems: "center",
      padding: "0 28px", gap: 16, position: "sticky", top: 0, zIndex: 200,
      boxShadow: "0 2px 20px rgba(0,0,0,.2)"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 16 }}>
        <div style={{ width: 34, height: 34, background: "rgba(255,255,255,.15)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "#fff", fontWeight: 700 }}>Meeting Room</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{isAdmin ? "Admin" : "Booking System"}</div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 2, flex: 1 }}>
        {links.map(([label, key]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            style={{
              background: page === key ? "rgba(255,255,255,.18)" : "none",
              color: page === key ? "#fff" : "rgba(255,255,255,.7)",
              border: "none", padding: "7px 13px", borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "var(--font)", transition: "all .2s",
              borderBottom: page === key ? "2px solid rgba(255,255,255,.9)" : "2px solid transparent"
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isAdmin && <Badge status="ADMIN" />}
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{initials}</div>
        <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>Hello, {user?.firstName}</span>
        <Btn variant="red" size="sm" onClick={handleLogout} style={{ borderRadius: 8 }}>Logout</Btn>
      </div>
    </nav>
  );
}
