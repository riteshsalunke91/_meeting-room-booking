function loadAdminRooms(){

fetch(`${BASE_URL}/admin/rooms`)
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(r=>{
html+=`
<tr>
<td>${r.roomName}</td>
<td>
<button onclick="deleteRoom(${r.id})">Delete</button>
</td>
</tr>
`;
});

roomTable.innerHTML=html;

});
}
function addRoom() {

    const roomName = document.getElementById("roomName").value;
    const location = document.getElementById("location").value;
    const capacity = parseInt(document.getElementById("capacity").value);
    const availableDate = document.getElementById("availableDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    // ✅ VALIDATION
    if (!roomName || !location || !capacity || !availableDate || !startTime || !endTime) {
        alert("❌ Please fill all fields");
        return;
    }

    // ✅ FIX TIME FORMAT
    const formattedStart = startTime.length === 5 ? startTime + ":00" : startTime;
    const formattedEnd = endTime.length === 5 ? endTime + ":00" : endTime;

    fetch(`${BASE_URL}/admin/rooms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            roomName: roomName,
            location: location,
            capacity: capacity, // ✅ int
            availableDate: availableDate,
            startTime: formattedStart, // ✅ HH:mm:ss
            endTime: formattedEnd
        })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    })
    .then(() => {
        alert("✅ Room Added Successfully");
        loadAdminRooms();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Error: " + err.message);
    });
}

// ✅ DELETE ROOM
function deleteRoom(id) {

    if (!confirm("Delete this room?")) return;

    fetch(`${BASE_URL}/admin/rooms/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("Deleted");
            loadAdminRooms();
        });
}


// ✅ EDIT ROOM
function editRoom(id) {

    const roomName = prompt("Room Name");
    const location = prompt("Location");
    const capacity = prompt("Capacity");
    const date = prompt("Date (YYYY-MM-DD)");
    const start = prompt("Start Time");
    const end = prompt("End Time");

    fetch(`${BASE_URL}/admin/rooms/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            roomName,
            location,
            capacity,
            availableDate: date,
            startTime: start,
            endTime: end
        })
    })
        .then(() => {
            alert("Updated");
            loadAdminRooms();
        });
}


// ✅ LOAD USERS
function loadUsers() {

    fetch(`${BASE_URL}/admin/users`)
        .then(handleResponse)
        .then(data => {

            let html = "";

            data.forEach(u => {
                html += `
                <div class="room-card">
                    <p><b>${u.name}</b> (${u.email})</p>
                    <button onclick="viewUserBookings(${u.id})">View Bookings</button>
                </div>`;
            });

            document.getElementById("users").innerHTML = html;
        });
}


// ✅ VIEW USER BOOKINGS
function viewUserBookings(userId) {

    fetch(`${BASE_URL}/booking/user/${userId}`)
        .then(handleResponse)
        .then(data => {

            let html = "";

            data.forEach(b => {
                html += `
                <div class="room-card">
                    <p>Room: ${b.room.roomName}</p>
                    <p>Date: ${b.date}</p>
                    <p>Time: ${b.startTime} - ${b.endTime}</p>
                </div>`;
            });

            document.getElementById("userBookings").innerHTML = html;
        });
}


function deleteRoom(id){

fetch(`${BASE_URL}/admin/rooms/${id}`,{
method:"DELETE"
})
.then(()=>loadAdminRooms());
}