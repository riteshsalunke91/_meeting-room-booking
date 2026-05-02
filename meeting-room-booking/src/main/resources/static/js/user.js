const BASE_URL = "http://localhost:8080";

// =======================
// LOGIN
// =======================
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${BASE_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error();

        const user = await res.json();

        localStorage.setItem("user", JSON.stringify(user));

        // Redirect
        if (user.role === "ADMIN") {
            window.location.href = "/admin/dashboard.html";
        } else {
            window.location.href = "/user/dashboard.html";
        }

    } catch {
        alert("❌ Invalid email or password");
    }
}

// =======================
// REGISTER
// =======================
async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${BASE_URL}/api/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (!res.ok) throw new Error();

        alert("✅ Registered successfully");
        window.location.href = "login.html";

    } catch {
        alert("❌ Registration failed");
    }
}

// =======================
// CHECK LOGIN
// =======================
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login.html";
    }
}

// =======================
// SHOW USER NAME
// =======================
function showUser() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        if (document.getElementById("welcomeName")) {
            document.getElementById("welcomeName").innerText =
                `Welcome back, ${user.name}! 👋`;
        }

        if (document.getElementById("navUserName")) {
            document.getElementById("navUserName").innerText = user.name;
        }
    }
}

// =======================
// LOGOUT
// =======================
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "/login.html";
}

// =======================
// ACCOUNT DETAILS
// =======================
function loadAccount() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("accName").innerText = user.name;
        document.getElementById("accEmail").innerText = user.email;
    }
}

// =======================
// LOAD ROOMS
// =======================
async function loadRooms() {
    const div = document.getElementById("rooms");
    if (!div) return;

    try {
        const res = await fetch(`${BASE_URL}/room`);
        const data = await res.json();

        div.innerHTML = "";

        data.forEach(r => {
            div.innerHTML += `
                <div class="room-card">
                    <h3>${r.roomName}</h3>
                    <p>📍 ${r.location}</p>
                    <p>👥 ${r.capacity}</p>

                    <input type="date" id="d-${r.id}">
                    <input type="time" id="s-${r.id}">
                    <input type="time" id="e-${r.id}">

                    <button onclick="bookRoom(${r.id})">Book</button>
                </div>
            `;
        });

    } catch {
        div.innerHTML = "❌ Failed to load rooms";
    }
}

// =======================
// BOOK ROOM
// =======================
async function bookRoom(id) {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        await fetch(`${BASE_URL}/booking`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: { id: user.id },
                room: { id: id },
                date: document.getElementById(`d-${id}`).value,
                startTime: document.getElementById(`s-${id}`).value,
                endTime: document.getElementById(`e-${id}`).value
            })
        });

        alert("✅ Room Booked");

    } catch {
        alert("❌ Booking failed");
    }
}

// =======================
// LOAD HISTORY
// =======================
async function loadHistory() {
    const user = JSON.parse(localStorage.getItem("user"));
    const div = document.getElementById("history");

    if (!div) return;

    const res = await fetch(`${BASE_URL}/booking/user/${user.id}`);
    const data = await res.json();

    div.innerHTML = "";

    data.forEach(b => {
        div.innerHTML += `
            <div class="room-card">
                ${b.room.roomName} - ${b.date}
                <button onclick="cancelBooking(${b.id})">Cancel</button>
            </div>
        `;
    });
}

// =======================
// CANCEL BOOKING
// =======================
async function cancelBooking(id) {
    if (!confirm("Cancel booking?")) return;

    await fetch(`${BASE_URL}/booking/${id}`, {
        method: "DELETE"
    });

    loadHistory();
}

// =======================
// AUTO LOAD (IMPORTANT)
// =======================
window.onload = function () {

    const path = window.location.pathname;

    if (path.includes("dashboard")) {
        checkLogin();
        showUser();
        loadRooms();
        loadHistory();
    }

    if (path.includes("account")) {
        checkLogin();
        loadAccount();
    }
};