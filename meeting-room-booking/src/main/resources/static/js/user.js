



// GET USER ID
let userId = localStorage.getItem("userId");

////////////////////////////////////////////////////
// ✅ LOAD ROOMS
function loadRooms(){

fetch("http://localhost:8080/room")
.then(res => res.json())
.then(data => {

let div = document.getElementById("rooms");

// if page doesn't have rooms div → stop
if(!div) return;

div.innerHTML = "";

data.forEach(r => {

div.innerHTML += `
<div class="room-card">

<h3>${r.roomName}</h3>
<p>📍 ${r.location}</p>
<p>👥 Capacity: ${r.capacity}</p>
<p>📅 ${r.availableDate}</p>

<input type="date" id="date-${r.id}">

<div class="input-row">
<input type="time" id="start-${r.id}">
<input type="time" id="end-${r.id}">
</div>

<button onclick="bookRoom(${r.id})">Book</button>

</div>
`;

});

});
}

////////////////////////////////////////////////////
// ✅ BOOK ROOM
function bookRoom(roomId){

let date = document.getElementById(`date-${roomId}`).value;
let start = document.getElementById(`start-${roomId}`).value;
let end = document.getElementById(`end-${roomId}`).value;

// VALIDATION
if(!date || !start || !end){
alert("Please select date and time");
return;
}

fetch("http://localhost:8080/booking",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user:{id:userId},
room:{id:roomId},
date:date,
startTime:start,
endTime:end
})
})
.then(res => {
if(!res.ok){
throw new Error("Booking failed");
}
return res.json();
})
.then(()=>{
alert("✅ Room Booked Successfully");
})
.catch(err=>{
alert("❌ " + err.message);
});
}

////////////////////////////////////////////////////
// ✅ LOAD BOOKING HISTORY
// function loadHistory(){

// let div = document.getElementById("history");

// // if page doesn't have history div → stop
// if(!div) return;

// fetch(`http://localhost:8080/booking/user/${userId}`)
// .then(res => res.json())
// .then(data => {

// div.innerHTML = "";

// if(data.length === 0){
// div.innerHTML = "<p>No bookings found</p>";
// return;
// }

// data.forEach(b => {

// div.innerHTML += `
// <div class="room-card">

// <p><b>Room:</b> ${b.room?.roomName}</p>
// <p><b>Date:</b> ${b.date}</p>
// <p><b>Time:</b> ${b.startTime} - ${b.endTime}</p>

// <button onclick="cancelBooking(${b.id})">Cancel</button>

// </div>
// `;

// });

// });
// }

function loadHistory(){

let userId = localStorage.getItem("userId");

let div = document.getElementById("history");
if(!div) return;

fetch(`http://localhost:8080/booking/user/${userId}`)
.then(res=>res.json())
.then(data=>{

div.innerHTML="";

if(data.length === 0){
div.innerHTML = "<p>No bookings found</p>";
return;
}

data.forEach(b=>{

div.innerHTML+=`
<div class="room-card">

<p><b>Room:</b> ${b.room ? b.room.roomName : "N/A"}</p>
<p><b>Date:</b> ${b.date}</p>
<p><b>Time:</b> ${b.startTime} - ${b.endTime}</p>

<button onclick="cancelBooking(${b.id})">Cancel</button>

</div>
`;

});

});

}
////////////////////////////////////////////////////
// ✅ CANCEL BOOKING
// function cancelBooking(id){

// if(!confirm("Cancel this booking?")) return;

// fetch(`http://localhost:8080/booking/${id}`,{
// method:"DELETE"
// })
// .then(()=>{
// alert("❌ Booking Cancelled");
// loadHistory();
// });
// }

////////////////////////////////////////////////////
// ✅ AUTO LOAD BASED ON PAGE
window.onload = function(){

loadRooms();   // only works if rooms div exists
loadHistory(); // only works if history div exists

};