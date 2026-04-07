package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.BookingModel;
//import com.example.meeting_room_booking.repository.BookingRepository;
 import com.example.meeting_room_booking.service.BookingService;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService service;

    // BOOK ROOM
    @PostMapping
    public BookingModel book(@RequestBody BookingModel b){
        return service.createBooking(b);
    }

    // USER BOOKINGS
    @GetMapping("/user/{id}")
    public List<BookingModel> userBookings(@PathVariable Long id){
        return service.getUserBookings(id);
    }

    // CANCEL
    @DeleteMapping("/{id}")
    public String cancel(@PathVariable Long id){
        service.cancelBooking(id);
        return "Cancelled";
    }
}