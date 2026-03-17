function addRoom(){

let roomName=document.getElementById("roomName").value;
let location=document.getElementById("location").value;
let capacity=document.getElementById("capacity").value;

let availableDate=document.getElementById("availableDate").value;
let startTime=document.getElementById("startTime").value;
let endTime=document.getElementById("endTime").value;

fetch("http://localhost:8080/admin/rooms",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
roomName:roomName,
location:location,
capacity:capacity,
availableDate:availableDate,
startTime:startTime,
endTime:endTime
})

})
.then(res=>res.json())
.then(data=>{
console.log(data);
alert("Room Added Successfully");
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