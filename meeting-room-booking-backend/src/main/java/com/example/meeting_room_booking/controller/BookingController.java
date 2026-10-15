
// package com.example.meeting_room_booking.controller;

// import com.example.meeting_room_booking.dto.BookingRequestDTO;
// import com.example.meeting_room_booking.service.BookingService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/bookings")
// @CrossOrigin(origins = "http://localhost:5173")
// public class BookingController {
//     private final BookingService bookingService;

//     public BookingController(BookingService bookingService)
//     {
//         this.bookingService = bookingService;
//     }

//     @GetMapping
//     public ResponseEntity<?> getAll() {
//         return ResponseEntity.ok(
//             Map.of("data", bookingService.getAllBookings())
//         );
//     }

//     @GetMapping("/user/{userId}")
//     public ResponseEntity<?> getByUser(@PathVariable Long userId) {
//         return ResponseEntity.ok(
//             Map.of("data", bookingService.getBookingsByUser(userId))
//         );
//     }


//     @PostMapping
// public ResponseEntity<?> create(@RequestBody BookingRequestDTO request) {
//     return ResponseEntity.ok(Map.of("data", bookingService.createBooking(request)));
// }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> cancel(@PathVariable Long id) {
//         try {
//             return ResponseEntity.ok(
//                 Map.of("data", bookingService.cancelBooking(id))
//             );
//         } catch (Exception e) {
//             return ResponseEntity.badRequest()
//                 .body(Map.of("message", e.getMessage()));
//         }
//     }
// }

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
    "http://localhost:5174",   // ← your React port
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

    // GET /api/bookings/user/1  — User own bookings
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

    // DELETE /api/bookings/1  — Cancel booking
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        try {
            // ✅ Fixed: cancelBooking now returns String
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