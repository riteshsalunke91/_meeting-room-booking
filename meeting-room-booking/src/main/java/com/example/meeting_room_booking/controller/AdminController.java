

package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.RoomModel;
import com.example.meeting_room_booking.repository.BookingRepository;
import com.example.meeting_room_booking.repository.RoomRepository;
import com.example.meeting_room_booking.model.BookingModel;
 import com.example.meeting_room_booking.service.RoomService;
 import com.example.meeting_room_booking.service.BookingService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookingService;

    // Add Room
   @PostMapping("/rooms") public RoomModel addRoom(@RequestBody RoomModel room)
   { return roomService.addRoom(room); }

    // Update Room
    @PutMapping("/rooms/{id}")
    public RoomModel updateRoom(@PathVariable Long id, @RequestBody RoomModel room){
        return roomService.updateRoom(id, room);
    }

    // Delete Room
    @DeleteMapping("/rooms/{id}")
    public String deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
        return "Room Deleted Successfully";
    }

    // View All Bookings
    @GetMapping("/bookings")
    public List<BookingModel> getAllBooking(){
        return bookingService.getAllBookings();
    }
}