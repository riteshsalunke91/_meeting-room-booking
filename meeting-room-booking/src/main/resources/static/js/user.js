function bookRoom(roomId){

let userId = localStorage.getItem("userId");

let date = prompt("Enter Date (YYYY-MM-DD)");
let startTime = prompt("Enter Start Time (HH:MM)");
let endTime = prompt("Enter End Time (HH:MM)");

fetch("http://localhost:8080/booking",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:userId,
roomId:roomId,
date:date,
startTime:startTime,
endTime:endTime

})

})

.then(res=>res.json())

.then(data=>{
alert("Room Booked Successfully");
})

.catch(error=>{
alert("Room already booked for this time");
});

}

function cancelBooking(id){

fetch("http://localhost:8080/booking/"+id,{

method:"DELETE"

})
.then(res=>{

alert("Booking Cancelled");

loadBookingHistory();

});

}


// function bookRoom(roomId){

// let userId=1;
// let date=prompt("Enter date (YYYY-MM-DD)");
// let startTime=prompt("Enter start time (HH:MM)");
// let endTime=prompt("Enter end time (HH:MM)");

// fetch("http://localhost:8080/booking",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// userId:userId,
// roomId:roomId,
// date:date,
// startTime:startTime,
// endTime:endTime
// })
// })
// .then(res=>res.json())
// .then(data=>{
// alert("Room booked");
// });

// }


function loadBookingHistory(){

let userId = localStorage.getItem("userId");

fetch("http://localhost:8080/booking/user/"+userId)

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

</div>

`;

});

});

}


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

<button onclick="bookRoom(${room.id})">
Book Room
</button>

</div>
`;

});

});
}