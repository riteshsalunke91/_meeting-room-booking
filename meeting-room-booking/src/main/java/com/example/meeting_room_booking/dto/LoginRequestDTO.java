// package com.example.meeting_room_booking.dto;



// public class LoginRequest {

// private String email;
// private String password;

// public String getEmail()
// {return email;}
// public String getPassword(){return password;}

// public void setEmail(String email)
// {this.email=email;}
// public void setPassword(String password){this.password=password;}

// }

package com.example.meeting_room_booking.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}