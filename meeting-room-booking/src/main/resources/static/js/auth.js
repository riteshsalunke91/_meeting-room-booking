function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email, password); // DEBUG

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    })
    .then(data => {

        console.log(data); // DEBUG

        localStorage.setItem("userId", data.id);

        if (data.role === "ADMIN") {
            window.location.href = "admin/admin-dashboard.html";
        } else {
            window.location.href = "user/user-dashboard.html";
        }
    })
    .catch(() => {
        alert("❌ Invalid email or password");
    });
}

