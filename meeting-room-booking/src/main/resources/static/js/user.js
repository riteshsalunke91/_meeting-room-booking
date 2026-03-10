function loadRooms(){

fetch("http://localhost:8080/room")

.then(res=>res.json())

.then(data=>{

let div=document.getElementById("rooms");
div.innerHTML="";

data.forEach(room=>{

div.innerHTML+=`
<div class="room-card">

<h3>${room.roomName}</h3>

<p>Location: ${room.location}</p>

<p>Capacity: ${room.capacity}</p>

<p>Date: ${room.availableDate}</p>

<p>Start: ${room.startTime}</p>

<p>End: ${room.endTime}</p>

<button onclick="bookRoom(${room.id})">Book</button>

</div>
`;

});

});

}

function bookRoom(roomId){

fetch("http://localhost:8080/booking",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:1,
roomId:roomId,
date:"2026-04-10",
startTime:"10:00",
endTime:"11:00"

})

})

.then(res=>res.json())
.then(data=>{
alert("Booking Successful");
});

}

function loadBookingHistory(){

fetch("http://localhost:8080/booking/user/1")

.then(res=>res.json())

.then(data=>{

let div=document.getElementById("history");

div.innerHTML="";

data.forEach(b=>{

div.innerHTML+=`

<div class="room-card">

<p>Room ID: ${b.roomId}</p>

<p>Date: ${b.date}</p>

<p>Start: ${b.startTime}</p>

<p>End: ${b.endTime}</p>

<button onclick="cancelBooking(${b.id})">
Cancel Booking
</button>

</div>

`;

});

});

}

function cancelBooking(id){

fetch("http://localhost:8080/booking/"+id,{

method:"DELETE"

})

.then(()=>{

alert("Booking Cancelled");

loadBookingHistory();

});

}