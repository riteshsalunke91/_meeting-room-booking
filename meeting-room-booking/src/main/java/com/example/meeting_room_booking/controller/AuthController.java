package com.example.meeting_room_booking.controller;

import com.example.meeting_room_booking.dto.*;
import com.example.meeting_room_booking.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    // Constructor injection — NO Lombok
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ─────────────────────────────────────────
    // POST /api/auth/register
    // ─────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", authService.register(request))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // POST /api/auth/login
    // ─────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", authService.login(request))
            );
        } catch (Exception e) {
            return ResponseEntity.status(401)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // POST /api/auth/logout
    // ─────────────────────────────────────────
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequestDTO request) {
        return ResponseEntity.ok(Map.of(
            "message", "Logged out successfully",
            "email",   request.getEmail()
        ));
    }

    // ─────────────────────────────────────────
    // GET /api/auth/user/{id}   ← FIXED
    // ─────────────────────────────────────────
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            LoginResponseDTO user = authService.getUserById(id); // ← fixed
            return ResponseEntity.ok(Map.of("data", user));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────
    // PUT /api/auth/user/{id}
    // ─────────────────────────────────────────
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody RegisterRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", authService.updateUser(id, request))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }
}