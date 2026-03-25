

let userId = localStorage.getItem("userId");

// ✅ LOAD ALL ROOMS
function loadRooms(){

fetch("http://localhost:8080/admin/rooms")
.then(res=>res.json())
.then(data=>{
let html="";

data.forEach(r=>{
html += `
<p>
<b>${r.name}</b> - ${r.location} (Capacity: ${r.capacity})
<button onclick="selectRoom(${r.id})">Select</button>
</p>
`;
});

document.getElementById("rooms").innerHTML = html;

});

}

// ✅ SELECT ROOM
function selectRoom(id){
document.getElementById("roomId").value = id;
}

// ✅ CHECK AVAILABILITY
function checkAvailability(){

let date = document.getElementById("date").value;
let start = document.getElementById("startTime").value;
let end = document.getElementById("endTime").value;

fetch("http://localhost:8080/admin/rooms")
.then(res=>res.json())
.then(data=>{
let html="";

data.forEach(r=>{
html += `<p>${r.name} - Available</p>`;
});

document.getElementById("availableRooms").innerHTML = html;

});

}

// ✅ BOOK ROOM
function bookRoom(){

fetch("http://localhost:8080/booking",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user:{id:userId},
room:{id:document.getElementById("roomId").value},
date:document.getElementById("bookDate").value,
startTime:document.getElementById("bookStart").value,
endTime:document.getElementById("bookEnd").value
})
})
.then(res=>res.json())
.then(()=>{
alert("Room Booked");
loadHistory();
});

}

// ✅ LOAD BOOKING HISTORY
function loadHistory(){

fetch(`http://localhost:8080/booking/user/${userId}`)
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(b=>{
html += `
<p>
${b.room.name} - ${b.date} (${b.startTime} - ${b.endTime})
<button onclick="cancelBooking(${b.id})">Cancel</button>
</p>
`;
});

document.getElementById("history").innerHTML = html;

});

}

// ✅ CANCEL BOOKING
function cancelBooking(id){

fetch(`http://localhost:8080/booking/${id}`,{
method:"DELETE"
})
.then(()=>{
alert("Booking Cancelled");
loadHistory();
});

}

// AUTO LOAD
loadRooms();
loadHistory();



