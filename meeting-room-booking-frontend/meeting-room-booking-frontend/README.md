# Meeting Room Booking System

A full-featured React app for booking meeting rooms, with User and Admin roles.

---

## 📁 Folder Structure

```
meeting-room-booking/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                   # React entry point
    ├── App.jsx                    # Root component & page router
    │
    ├── styles/
    │   └── global.css             # CSS variables, animations, reset
    │
    ├── context/
    │   └── AuthContext.jsx        # Auth state (login/logout/user)
    │
    ├── data/
    │   └── mockData.js            # Mock users, rooms, bookings
    │
    ├── utils/
    │   └── api.js                 # apiFetch() – real API with mock fallback
    │
    ├── components/
    │   ├── ui/
    │   │   └── index.jsx          # Spinner, Badge, Toast, Modal, Input, Select, Btn
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   └── auth/
    │       └── LoginPage.jsx      # Login + Register form
    │
    └── pages/
        ├── user/
        │   ├── UserDashboard.jsx
        │   ├── ViewRooms.jsx
        │   ├── BookRoom.jsx
        │   ├── BookingHistory.jsx
        │   └── AccountDetails.jsx
        └── admin/
            ├── AdminDashboard.jsx
            ├── AddRoom.jsx
            ├── ManageRooms.jsx
            └── AllBookings.jsx
```

---

## 🚀 Getting Started

```bash
cd meeting-room-booking
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 Demo Credentials

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| User  | john@gmail.com         | john123    |
| Admin | admin@roombook.com     | admin123   |

---

## 🔌 Backend Integration

The app tries your real API at `http://localhost:8080/api` first.  
If unreachable, it silently falls back to the mock data in `src/data/mockData.js`.

API endpoints expected:
- `POST /auth/login` / `POST /auth/register`
- `GET /rooms` / `GET /rooms/available` / `POST /rooms` / `PUT /rooms/:id` / `DELETE /rooms/:id`
- `GET /bookings` / `GET /bookings/user/:id` / `POST /bookings` / `DELETE /bookings/:id`

---

## ✨ Features

- **User**: Browse rooms, book with conflict detection, view/cancel booking history, edit profile & password
- **Admin**: Dashboard stats, add/edit/delete rooms, view all bookings
- Role-based navigation and access
- Demo credentials auto-fill on login page
- Mock data fallback for offline development
