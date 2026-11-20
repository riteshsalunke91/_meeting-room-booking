package com.example.meeting_room_booking.controller;

import com.example.meeting_room_booking.dto.RoomRequestDTO;
import com.example.meeting_room_booking.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000"
})
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(
            Map.of("data", roomService.getAllRooms())
        );
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailable() {
        return ResponseEntity.ok(
            Map.of("data", roomService.getAvailableRooms())
        );
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RoomRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", roomService.createRoom(request))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody RoomRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", roomService.updateRoom(id, request))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.ok(
                Map.of("message", "Room deleted successfully")
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }
}
