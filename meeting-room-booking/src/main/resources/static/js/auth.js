// function login() {

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     console.log(email, password); // DEBUG

//     fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(res => {
//         if (!res.ok) throw new Error("Login failed");
//         return res.json();
//     })
//     .then(data => {

//         console.log(data); // DEBUG

//         localStorage.setItem("userId", data.id);

//         if (data.role === "ADMIN") {
//             window.location.href = "admin/admin-dashboard.html";
//         } else {
//             window.location.href = "user/user-dashboard.html";
//         }
//     })
//     .catch(() => {
//         alert("❌ Invalid email or password");
//     });
// }


// ===============================
// Meeting Room Booking System JS
// Register + Login + Logout
// Welcome Username
// Account Details
// LocalStorage Based
// ===============================

// -------------------------------
// REGISTER USER
// -------------------------------
function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");
    window.location.href = "login.html";
}

// -------------------------------
// LOGIN USER
// -------------------------------
function loginUser() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser == null) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password");
    }
}

// -------------------------------
// CHECK LOGIN STATUS
// -------------------------------
function checkLogin() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}

// -------------------------------
// SHOW USER NAME
// -------------------------------
function showUserName() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("welcomeName").innerText =
            "Welcome, " + user.name + "!";
        
        document.getElementById("navUserName").innerText =
            user.name;
    }
}

// -------------------------------
// LOGOUT USER
// -------------------------------
function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged Out Successfully!");
    window.location.href = "login.html";
}

// -------------------------------
// ACCOUNT DETAILS
// -------------------------------
function showAccountDetails() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("accName").innerText = user.name;
        document.getElementById("accEmail").innerText = user.email;
    }
}

// -------------------------------
// AUTO RUN ON DASHBOARD
// -------------------------------
window.onload = function () {
    if (window.location.pathname.includes("dashboard.html")) {
        checkLogin();
        showUserName();
    }

    if (window.location.pathname.includes("account.html")) {
        checkLogin();
        showAccountDetails();
    }
};

