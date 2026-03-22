package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.BookingModel;
import com.example.meeting_room_booking.repository.BookingRepository;
// import com.example.meeting_room_booking.service.BookingService;





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


@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository repo;

    // GET ALL BOOKINGS (ADMIN)
    @GetMapping("/bookings")
    public List<BookingModel> getBookings(){
        return repo.findAll();
    }
}
