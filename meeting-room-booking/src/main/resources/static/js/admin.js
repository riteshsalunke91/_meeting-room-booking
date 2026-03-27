// function addRoom(){

// let roomName=document.getElementById("roomName").value;
// let location=document.getElementById("location").value;
// let capacity=document.getElementById("capacity").value;

// let availableDate=document.getElementById("availableDate").value;
// let startTime=document.getElementById("startTime").value;
// let endTime=document.getElementById("endTime").value;

// fetch("http://localhost:8080/admin/rooms",{

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({
// roomName:roomName,
// location:location,
// capacity:capacity,
// availableDate:availableDate,
// startTime:startTime,
// endTime:endTime
// })

// })
// .then(res=>res.json())
// .then(data=>{
// console.log(data);
// alert("Room Added Successfully");
// });

// }


// ✅ ADD ROOM
function addRoom(){

fetch("http://localhost:8080/admin/rooms",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
roomName:document.getElementById("roomName").value,
location:document.getElementById("location").value,
capacity:document.getElementById("capacity").value,
availableDate:document.getElementById("availableDate").value,
startTime:document.getElementById("startTime").value,
endTime:document.getElementById("endTime").value
})
})
.then(res=>res.json())
.then(()=>{
alert("Room Added");
});
}

////////////////////////////////////////////////////

// ✅ LOAD ROOMS
function loadRooms(){

fetch("http://localhost:8080/admin/rooms")
.then(res=>res.json())
.then(data=>{

let table=document.getElementById("roomTable");
table.innerHTML="";

data.forEach(r=>{

table.innerHTML+=`
<tr>
<td>${r.roomName}</td>
<td>${r.location}</td>
<td>${r.capacity}</td>
<td>${r.availableDate}</td>
<td>${r.startTime} - ${r.endTime}</td>
<td>
<button onclick="editRoom(${r.id})">Edit</button>
<button onclick="deleteRoom(${r.id})">Delete</button>
</td>
</tr>
`;

});

});
}

////////////////////////////////////////////////////

// ✅ DELETE ROOM
function deleteRoom(id){

if(confirm("Delete this room?")){

fetch(`http://localhost:8080/admin/rooms/${id}`,{
method:"DELETE"
})
.then(()=>{
alert("Deleted");
loadRooms();
});

}
}

////////////////////////////////////////////////////

// ✅ EDIT ROOM
function editRoom(id){

let roomName = prompt("Room Name");
let location = prompt("Location");
let capacity = prompt("Capacity");
let date = prompt("Date (YYYY-MM-DD)");
let start = prompt("Start Time");
let end = prompt("End Time");

fetch(`http://localhost:8080/admin/rooms/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
roomName,
location,
capacity,
availableDate:date,
startTime:start,
endTime:end
})
})
.then(()=>{
alert("Updated");
loadRooms();
});

}

////////////////////////////////////////////////////

// ✅ LOAD BOOKINGS
function loadAllBookings(){

fetch("http://localhost:8080/admin/bookings")
.then(res=>res.json())
.then(data=>{

let div=document.getElementById("bookings");
div.innerHTML="";

data.forEach(b=>{

div.innerHTML+=`
<div class="room-card">
<p><b>User:</b> ${b.user?.name}</p>
<p><b>Room:</b> ${b.room?.roomName}</p>
<p><b>Date:</b> ${b.date}</p>
<p><b>Time:</b> ${b.startTime} - ${b.endTime}</p>
</div>
`;

});

});
}




function loadAllBookings(){

fetch("http://localhost:8080/admin/bookings")

.then(res=>res.json())

.then(data=>{

let div=document.getElementById("bookings");

div.innerHTML="";

data.forEach(b=>{

div.innerHTML+=`

<div class="room-card">

<p>User ID: ${b.userId}</p>

<p>Room ID: ${b.roomId}</p>

<p>Date: ${b.date}</p>

<p>Start: ${b.startTime}</p>

<p>End: ${b.endTime}</p>

</div>

`;

});

});

}

//manage room

fetch("http://localhost:8080/admin/rooms")
.then(res => res.json())
.then(data => {
    let table = document.getElementById("roomTable");
    table.innerHTML = "";

    data.forEach(r => {
        table.innerHTML += `
        <tr>
            <td>${r.roomName}</td>
            <td>${r.location}</td>
            <td>${r.capacity}</td>
            <td>${r.availableDate}</td>
            <td>${r.startTime} - ${r.endTime}</td>
        </tr>`;
    });
});


