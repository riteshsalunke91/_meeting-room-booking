function cancelBooking(id){

if(!confirm("Cancel this booking?")){
return;
}

fetch("http://localhost:8080/booking/"+id,{

method:"DELETE"

})

.then(()=>{

alert("Booking Cancelled");

loadBookingHistory();

});

}