# Backend Integration Guide (Spring Boot)

## Step 1 — Add CORS config to Spring Boot

Copy `CorsConfig.java` into your Spring Boot project under:
```
src/main/java/com/yourpackage/config/CorsConfig.java
```
Change the package name at the top to match your project.

---

## Step 2 — Required API Endpoints

Your Spring Boot app must expose these REST endpoints:

### Auth
| Method | Endpoint            | Request Body                              | Response                        |
|--------|---------------------|-------------------------------------------|---------------------------------|
| POST   | /api/auth/login     | `{ email, password }`                     | `{ token, user: {...} }`        |
| POST   | /api/auth/register  | `{ firstName, lastName, email, password, department, employeeId, role }` | `{ token, user: {...} }` |

### Rooms
| Method | Endpoint              | Notes                        |
|--------|-----------------------|------------------------------|
| GET    | /api/rooms            | All rooms (admin)            |
| GET    | /api/rooms/available  | Only AVAILABLE rooms (user)  |
| POST   | /api/rooms            | Add room (admin)             |
| PUT    | /api/rooms/{id}       | Update room (admin)          |
| DELETE | /api/rooms/{id}       | Delete room (admin)          |

### Bookings
| Method | Endpoint                  | Notes                          |
|--------|---------------------------|--------------------------------|
| GET    | /api/bookings             | All bookings (admin)           |
| GET    | /api/bookings/user/{id}   | Bookings for a user            |
| POST   | /api/bookings             | Create booking                 |
| DELETE | /api/bookings/{id}        | Cancel booking                 |

---

## Step 3 — JWT Token Response Format

The React app looks for the token in these fields (in order):
```json
{ "token": "eyJ...",   "user": { ... } }
{ "accessToken": "...", "user": { ... } }
{ "jwt": "...",         "user": { ... } }
```
If your Spring Boot returns a different structure, edit `src/components/auth/LoginPage.jsx`
lines that read: `res.token || res.accessToken || res.jwt || res.data?.token`

---

## Step 4 — application.properties (Spring Boot)

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/meeting_room_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Step 5 — Run Both Together

Terminal 1 — Spring Boot:
```bash
cd your-spring-boot-project
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

Terminal 2 — React:
```bash
cd meeting-room-booking
npm install
npm run dev
# Runs on http://localhost:5173
```

Open browser: http://localhost:5173

---

## How the Fallback Works

If Spring Boot is NOT running, the React app automatically uses mock data
(defined in `src/data/mockData.js`). So you can develop the frontend independently.

Demo credentials (mock):
- User:  john@gmail.com / john123
- Admin: admin@roombook.com / admin123
