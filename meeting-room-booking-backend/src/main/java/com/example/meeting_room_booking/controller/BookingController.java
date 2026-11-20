package com.example.meeting_room_booking.controller;

import com.example.meeting_room_booking.dto.BookingRequestDTO;
import com.example.meeting_room_booking.dto.Response.BookingResponseDTO;
import com.example.meeting_room_booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000"
})
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // GET /api/bookings  — Admin all bookings
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<BookingResponseDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", bookings
        ));
    }

    // GET /api/bookings/user/{userId}  — User own bookings
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        List<BookingResponseDTO> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", bookings
        ));
    }

    // POST /api/bookings  — Create booking
    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingRequestDTO request) {
        try {
            BookingResponseDTO booking = bookingService.createBooking(request);
            return ResponseEntity.status(201).body(Map.of(
                "success", true,
                "message", "Room booked successfully!",
                "data", booking
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    // DELETE /api/bookings/{id}  — Cancel booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        try {
            String message = bookingService.cancelBooking(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", message
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
}
