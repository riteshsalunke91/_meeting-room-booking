package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.BookingModel;
import com.example.meeting_room_booking.service.BookingService;

// @CrossOrigin(origins="*")
// @RestController
// @RequestMapping("/booking")
// public class BookingController {

//     @Autowired
//     private BookingService bookingService;

//     // Book a room
//     @PostMapping
//     public BookingModel bookRoom(@RequestBody BookingModel booking){
//         return bookingService.createBooking(booking);
//     }

//     // Cancel booking
//     @DeleteMapping("/{id}")
//     public void cancelBooking(@PathVariable Long id){
//         bookingService.cancelBooking(id);
//     }

//     // Get bookings by user
//     @GetMapping("/user/{id}")
//     public List<BookingModel> getUserBookings(@PathVariable Long id){
//         return bookingService.getUserBookings(id);
//     }

// }

// @CrossOrigin(origins="*")
// @RestController
// @RequestMapping("/booking")
// public class BookingController {

//     @Autowired
//     private BookingService bookingService;

//     @PostMapping
//     public BookingModel bookRoom(@RequestBody BookingModel booking){
//         return bookingService.createBooking(booking);
//     }

//     @GetMapping("/user/{id}")
//     public List<BookingModel> getUserBookings(@PathVariable Long id){
//         return bookingService.getUserBookings(id);
//     }

// }


@CrossOrigin(origins="*")
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public BookingModel bookRoom(@RequestBody BookingModel booking){
        return bookingService.createBooking(booking);
    }

    @GetMapping("/user/{id}")
    public List<BookingModel> getUserBookings(@PathVariable Long id){
        return bookingService.getUserBookings(id);
    }

}
