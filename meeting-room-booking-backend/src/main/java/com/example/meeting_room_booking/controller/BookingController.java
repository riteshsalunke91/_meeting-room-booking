


package com.example.meeting_room_booking.controller;

import com.example.meeting_room_booking.dto.BookingRequestDTO;
import com.example.meeting_room_booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(
            Map.of("data", bookingService.getAllBookings())
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(
            Map.of("data", bookingService.getBookingsByUser(userId))
        );
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingRequestDTO request) {
        try {
            return ResponseEntity.ok(
                Map.of("data", bookingService.createBooking(request))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(
                Map.of("data", bookingService.cancelBooking(id))
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }
}