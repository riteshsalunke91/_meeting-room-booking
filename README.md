# Meeting Room Booking System
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
<<<<<<< HEAD
   

=======
>>>>>>> e155107 (Update project)
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
