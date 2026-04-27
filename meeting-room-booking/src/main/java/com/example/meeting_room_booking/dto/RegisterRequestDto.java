package com.example.meeting_room_booking.dto;

public class RegisterRequestDto {
   private String name;
   private String email;
   private String password;

public String getname(){
    return name;
}
public String getemail(){
    return email;
}
public String getpassword(){
    return password;
}

public void setbname(String name){
    this.name = name;
}


public void setemail(String email){
    this.email = email;
}

public void setpassword(String password){
    this.password = password;
}

}