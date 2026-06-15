import { useState, useCallback } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginPage from "./components/auth/LoginPage";
import { Toast } from "./components/ui";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import ViewRooms from "./pages/user/ViewRooms";
import BookRoom from "./pages/user/BookRoom";
import BookingHistory from "./pages/user/BookingHistory";
import AccountDetails from "./pages/user/AccountDetails";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddRoom from "./pages/admin/AddRoom";
import ManageRooms from "./pages/admin/ManageRooms";
import AllBookings from "./pages/admin/AllBookings";

import "./styles/global.css";

function AppShell() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState(() => {
    if (!user) return "login";
    return user.role === "ADMIN" ? "adminDashboard" : "dashboard";
  });
  const [preselectedRoom, setPreselectedRoom] = useState(null);
  const [editRoom, setEditRoom] = useState(null);
  const [toast, setToast] = useState(null);

  const nav = useCallback((p) => { setPage(p); window.scrollTo(0, 0); }, []);

  const handleLoginSuccess = (targetPage) => { setPage(targetPage); };

  const handleLogout = useCallback(() => {
    logout();
    setPage("login");
    setToast({ msg: "Logged out successfully", type: "success" });
  }, [logout]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <UserDashboard setPage={nav} />;
      case "viewRooms":      return <ViewRooms setPage={nav} setPreselectedRoom={setPreselectedRoom} />;
      case "bookRoom":       return <BookRoom setPage={nav} preselectedRoom={preselectedRoom} />;
      case "bookingHistory": return <BookingHistory />;
      case "account":        return <AccountDetails />;
      case "adminDashboard": return <AdminDashboard setPage={nav} />;
      case "addRoom":        return <AddRoom setPage={nav} editRoom={editRoom} setEditRoom={setEditRoom} />;
      case "manageRooms":    return <ManageRooms setPage={nav} setEditRoom={setEditRoom} />;
      case "allBookings":    return <AllBookings />;
      default:               return <UserDashboard setPage={nav} />;
    }
  };

  if (!user) {
    return (
      <>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        <LoginPage onSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Navbar page={page} setPage={(p) => { if (p === "login") { handleLogout(); } else { nav(p); } }} />
      <main style={{ flex: 1 }}>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
