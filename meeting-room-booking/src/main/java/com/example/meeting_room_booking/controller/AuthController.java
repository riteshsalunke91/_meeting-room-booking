package com.example.meeting_room_booking.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meeting_room_booking.dto.LoginRequest;
import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public UserModel login(@RequestBody LoginRequest req) {
        return service.login(req.getEmail(), req.getPassword());
    }

//     @PostMapping("/logout")
//     public String logout(@RequestBody LogoutRequest req) {
//         service.logout(req.getEmail());
//         return "Logged out successfully";
//     }
// }

}