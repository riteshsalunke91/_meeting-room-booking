function bookRoom(roomId){

let userId=localStorage.getItem("userId");

let date=prompt("Enter date");

fetch("http://localhost:8080/booking",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:userId,
roomId:roomId,
date:date

})

});

alert("Room Booked");

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
function loadBookingHistory(){

let userId=localStorage.getItem("userId");

fetch("http://localhost:8080/booking/user/"+userId)

.then(res=>res.json())

.then(data=>{

let div=document.getElementById("history");

data.forEach(b=>{

div.innerHTML+=`

<p>Room ${b.roomId} ${b.date}</p>

`;

});

});

}