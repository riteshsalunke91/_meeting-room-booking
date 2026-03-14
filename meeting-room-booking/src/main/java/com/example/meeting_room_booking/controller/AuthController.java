package com.example.meeting_room_booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.dto.RegisterRequest;
import com.example.meeting_room_booking.dto.LoginRequest;
import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.service.UserService;


@CrossOrigin(origins="*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService service;

    // Login API
    @PostMapping("/login")
    public UserModel loginUser(@RequestBody LoginRequest request) {

        
        return service.login(request.getEmail(), request.getPassword());

    }

    // Register API
    @PostMapping("/register")
    public UserModel registerUser(@RequestBody RegisterRequest request){

        UserModel user = new UserModel();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        return service.registerUser(user);

    }
}
