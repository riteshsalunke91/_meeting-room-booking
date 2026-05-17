const BASE_URL = "http://localhost:8080";

// ======================================
// LOGIN
// ======================================

async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));

        // Redirect by role
        if (user.role === "ADMIN") {
            window.location.href = "../admin/admin-dashboard.html";
        } else {
            window.location.href = "../index.html";
        }

    } catch (error) {
        alert("❌ Login Failed");
        console.error(error);
    }
}

// ======================================
// REGISTER
// ======================================

async function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error();
        }

        alert("✅ Registration Successful");
        window.location.href = "login.html";

    } catch (error) {

        alert("❌ Registration Failed");
    }
}

// ======================================
// CHECK LOGIN
// ======================================

function checkLogin() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../login.html";
    }
}

// ======================================
// SHOW USER
// ======================================

function loadUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const nameElements = document.querySelectorAll(".user-name");

    nameElements.forEach(el => {
        el.innerText = user.name;
    });

    const welcome = document.getElementById("welcomeName");

    if (welcome) {
        welcome.innerText = `Welcome back, ${user.name} 👋`;
    }
}

// ======================================
// LOGOUT
// ======================================

function logoutUser() {

    localStorage.removeItem("user");

    window.location.href = "../login.html";
}

// ======================================
// LOAD ALL ROOMS
// ======================================

async function loadRooms() {

    const roomContainer = document.getElementById("rooms-grid")
        || document.getElementById("rooms-full-grid");

    if (!roomContainer) return;

    try {

        const response = await fetch(`${BASE_URL}/room`);

        const rooms = await response.json();

        roomContainer.innerHTML = "";

        rooms.forEach(room => {

            roomContainer.innerHTML += `

            <div class="room-card">

                <div class="room-img">
                    <i class="fa-solid fa-building"></i>
                </div>

                <div class="room-info">

                    <div class="room-name">
                        ${room.roomName}
                    </div>

                    <div class="room-meta">

                        <span>
                            <i class="fa-solid fa-location-dot"></i>
                            ${room.location}
                        </span>

                        <span>
                            <i class="fa-solid fa-users"></i>
                            ${room.capacity} People
                        </span>

                    </div>

                    <button class="btn btn-primary"
                        onclick="goToBooking(${room.id})">
                        Book Now
                    </button>

                </div>

            </div>
            `;
        });

    } catch (error) {

        console.error(error);

        roomContainer.innerHTML = `
            <div class="empty-state">
                ❌ Failed to load rooms
            </div>
        `;
    }
}

// ======================================
// GO TO BOOKING PAGE
// ======================================

function goToBooking(roomId) {

    window.location.href =
        `booking.html?roomId=${roomId}`;
}

// ======================================
// BOOK ROOM
// ======================================

async function submitBooking() {

    const user = JSON.parse(localStorage.getItem("user"));

    const roomId =
        document.getElementById("selectedRoomId").value;

    const title =
        document.getElementById("meetingTitle").value;

    const date =
        document.getElementById("bookingDate").value;

    const startTime =
        document.getElementById("startTime").value;

    const endTime =
        document.getElementById("endTime").value;

    try {

        const response = await fetch(`${BASE_URL}/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                title: title,

                user: {
                    id: user.id
                },

                room: {
                    id: roomId
                },

                date: date,
                startTime: startTime + ":00",
                endTime: endTime + ":00"
            })
        });

        if (!response.ok) {
            throw new Error();
        }

        document.getElementById("success-msg").style.display =
            "block";

        setTimeout(() => {
            window.location.href =
                "my-bookings.html";
        }, 1500);

    } catch (error) {

        document.getElementById("conflict-msg").style.display =
            "block";
    }
}

// ======================================
// LOAD MY BOOKINGS
// ======================================

async function loadMyBookings() {

    const user = JSON.parse(localStorage.getItem("user"));

    const bookingContainer =
        document.getElementById("booking-rows")
        || document.getElementById("bookings-list");

    if (!bookingContainer) return;

    try {

        const response = await fetch(
            `${BASE_URL}/booking/user/${user.id}`
        );

        const bookings = await response.json();

        bookingContainer.innerHTML = "";

        bookings.forEach(booking => {

            bookingContainer.innerHTML += `

            <div class="booking-item">

                <div class="booking-info">

                    <div class="booking-room">
                        ${booking.room.roomName}
                    </div>

                    <div class="booking-time">
                        ${booking.date}
                        •
                        ${booking.startTime}
                        -
                        ${booking.endTime}
                    </div>

                </div>

                <button class="btn btn-danger"
                    onclick="cancelBooking(${booking.id})">
                    Cancel
                </button>

            </div>
            `;
        });

    } catch (error) {

        console.error(error);
    }
}

// ======================================
// CANCEL BOOKING
// ======================================

async function cancelBooking(id) {

    if (!confirm("Cancel booking?")) return;

    try {

        await fetch(`${BASE_URL}/booking/${id}`, {
            method: "DELETE"
        });

        loadMyBookings();

    } catch (error) {

        alert("❌ Failed");
    }
}

// ======================================
// ACCOUNT PAGE
// ======================================

function loadAccountDetails() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    document.getElementById("firstName").value =
        user.name;

    document.getElementById("email").value =
        user.email;
}

// ======================================
// AUTO LOAD
// ======================================

window.onload = () => {

    loadUser();

    const path = window.location.pathname;

    // Dashboard
    if (
        path.includes("index.html") ||
        path.includes("dashboard")
    ) {

        loadRooms();
        loadMyBookings();
    }

    // Rooms Page
    if (path.includes("rooms")) {
        loadRooms();
    }

    // Booking Page
    if (path.includes("booking")) {
        loadRooms();
    }

    // Booking History
    if (path.includes("my-bookings")) {
        loadMyBookings();
    }

    // Account
    if (path.includes("account")) {
        loadAccountDetails();
    }
};