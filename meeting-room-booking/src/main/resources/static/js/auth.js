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

localStorage.setItem("userId", data.id);

if(data.role==="ADMIN"){
window.location.href="admin/admin-dashboard.html";
}else{
window.location.href="user/user-dashboard.html";
}

});

}

function register(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let role=document.getElementById("role").value;

fetch("http://localhost:8080/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
email:email,
password:password,
role:role
})

})
.then(res=>res.json())
.then(data=>{
alert("Registered Successfully");
});

}