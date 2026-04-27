// // ✅ LOAD ROOMS
// function loadUserRooms() {

//     const div = document.getElementById("rooms");
//     if (!div) return;

//     div.innerHTML = "Loading...";

//     fetch(`${BASE_URL}/room`)
//         .then(handleResponse)
//         .then(data => {

//             div.innerHTML = "";

//             data.forEach(r => {

//                 const card = document.createElement("div");
//                 card.className = "room-card";

//                 card.innerHTML = `
//                     <h3>${r.roomName}</h3>
//                     <p>📍 ${r.location}</p>
//                     <p>👥 Capacity: ${r.capacity}</p>
//                     <p>📅 ${r.availableDate}</p>

//                     <input type="date" id="date-${r.id}">
                    
//                     <div class="input-row">
//                         <input type="time" id="start-${r.id}">
//                         <input type="time" id="end-${r.id}">
//                     </div>

//                     <button onclick="bookRoom(${r.id})">Book</button>
//                 `;

//                 div.appendChild(card);
//             });
//         })
//         .catch(err => {
//             div.innerHTML = "❌ Failed to load rooms";
//             console.error(err);
//         });
// }

// function loadUserRooms(){

// fetch(`${BASE_URL}/room`)
// .then(res=>res.json())
// .then(data=>{

// let html="";

// data.forEach(r=>{
// html+=`
// <div class="room-card">
// <h3>${r.roomName}</h3>
// <p>${r.location}</p>

// <input type="date" id="d-${r.id}">
// <input type="time" id="s-${r.id}">
// <input type="time" id="e-${r.id}">

// <button onclick="bookRoom(${r.id})">Book</button>
// </div>
// `;
// });

// rooms.innerHTML=html;

// });
// }
// // ✅ BOOK ROOM
// function bookRoom(id){

// fetch(`${BASE_URL}/booking`,{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body:JSON.stringify({
// user:{id:localStorage.getItem("userId")},
// room:{id:id},
// date:document.getElementById(`d-${id}`).value,
// startTime:document.getElementById(`s-${id}`).value,
// endTime:document.getElementById(`e-${id}`).value
// })
// })
// .then(()=>alert("Booked"));
// }


// // ✅ LOAD HISTORY
// function loadHistory(){

// fetch(`${BASE_URL}/booking/user/${localStorage.getItem("userId")}`)
// .then(res=>res.json())
// .then(data=>{

// let html="";

// data.forEach(b=>{
// html+=`
// <div class="room-card">
// ${b.room.roomName} - ${b.date}
// <button onclick="cancelBooking(${b.id})">Cancel</button>
// </div>
// `;
// });

// history.innerHTML=html;

// });
// }

// // ✅ CANCEL BOOKING
// function cancelBooking(id) {

//     if (!confirm("Cancel this booking?")) return;

//     fetch(`${BASE_URL}/booking/${id}`, {
//         method: "DELETE"
//     })
//         .then(() => {
//             alert("❌ Booking Cancelled");
//             loadHistory();
//         })
//         .catch(err => console.error(err));
// }


// // ✅ AUTO LOAD
// window.onload = function () {
//     loadUserRooms();
//     loadHistory();
// };
