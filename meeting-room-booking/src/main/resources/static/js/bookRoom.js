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

.then(res=>{

if(!res.ok){
throw new Error("Room already booked");
}

return res.json();

})

.then(data=>{
alert("Booking Successful");
})

.catch(err=>{
alert(err.message);
});

}