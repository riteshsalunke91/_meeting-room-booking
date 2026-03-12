function bookRoom(roomId){

let userId = 1; // temporary user id

let date = prompt("Enter date (YYYY-MM-DD)");
let startTime = prompt("Enter start time (HH:MM)");
let endTime = prompt("Enter end time (HH:MM)");

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

alert("Room booked successfully");

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