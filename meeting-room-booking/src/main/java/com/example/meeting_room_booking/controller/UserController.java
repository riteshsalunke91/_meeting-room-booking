
package com.example.meeting_room_booking.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.meeting_room_booking.dto.LoginRequest;
import com.example.meeting_room_booking.dto.RegisterRequestDto;
import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody LoginRequest req) {
        UserModel user = service.login(req.getEmail(), req.getPassword());
        return ResponseEntity.ok(user);
    }

    // LOGOUT
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String email) {
        service.logout(email);
        return ResponseEntity.ok("Logged out successfully");
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@RequestBody RegisterRequestDto req) {
        UserModel user = service.register(
                req.getName(),
                req.getEmail(),
                req.getPassword()
        );
        return ResponseEntity.ok(user);
    }
}