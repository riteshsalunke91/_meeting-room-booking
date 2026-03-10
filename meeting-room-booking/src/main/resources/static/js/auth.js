function login(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

fetch("http://localhost:8080/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
})
.then(res=>res.json())
.then(data=>{

if(data.role==="ADMIN"){
window.location.href="../admin/admin-dashboard.html";
}else{
window.location.href="../user/user-dashboard.html";
}

});
}