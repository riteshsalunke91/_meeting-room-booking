package com.example.meeting_room_booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// import com.example.meeting_room_booking.dto.RegisterRequest;
import com.example.meeting_room_booking.dto.LoginRequest;
import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.service.UserService;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

@Autowired
private UserService service;

@PostMapping("/login")
public UserModel login(@RequestBody LoginRequest req){

return service.login(req.getEmail(),req.getPassword());

}

}

