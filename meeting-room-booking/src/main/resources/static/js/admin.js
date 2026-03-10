function addRoom(){

let roomName=document.getElementById("roomName").value;
let location=document.getElementById("location").value;
let capacity=document.getElementById("capacity").value;
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
availableDate:"2026-04-10",
startTime:startTime,
endTime:endTime

})

});

alert("Room Added");

}