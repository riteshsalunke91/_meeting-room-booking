// package com.example.meeting_room_booking.controller;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.meeting_room_booking.dto.LoginRequest;
// import com.example.meeting_room_booking.model.UserModel;
// import com.example.meeting_room_booking.service.UserService;

// @RestController
// @RequestMapping("/auth")
// @CrossOrigin("*")
// public class AuthController {

//     private final UserService service;

//     public AuthController(UserService service) {
//         this.service = service;
//     }

//     @PostMapping("/login")
//     public UserModel login(@RequestBody LoginRequest req) {
//         return service.login(req.getEmail(), req.getPassword());
//     }

//     @PostMapping("/logout")
//     public String logout(@RequestBody LogoutRequest req) {
//         service.logout(req.getEmail());
//         return "Logged out successfully";
//     }

// @PostMapping("/register")
// public UserModel register(@RequestBody Register req) {
//     return service.register(
//         req.getName(),
//         req.getEmail(),
//         req.getPassword()
//     );
// }

// }

package com.example.meeting_room_booking.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meeting_room_booking.dto.LoginRequest;
import com.example.meeting_room_booking.dto.RegisterRequest;
import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.service.UserService;





@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService service;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(
                service.login(req.getEmail(), req.getPassword())
        );
    }

    // LOGOUT
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LoginRequest req) {
        service.logout(req.getEmail());
        return ResponseEntity.ok("Logged out successfully");
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@RequestBody RegisterRequest  req) {
        return ResponseEntity.ok(
                service.register(
                        req.getName(),
                        req.getEmail(),
                        req.getPassword()
                )
        );
    }
}