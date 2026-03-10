package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.RoomModel;
import com.example.meeting_room_booking.model.BookingModel;
import com.example.meeting_room_booking.service.RoomService;
import com.example.meeting_room_booking.service.BookingService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookingService;

    // Add room
    @PostMapping("/rooms")
    public RoomModel addRoom(@RequestBody RoomModel room){
        return roomService.addRoom(room);
    }

    // Update room
    @PutMapping("/rooms/{id}")
    public RoomModel updateRoom(@PathVariable Long id, @RequestBody RoomModel room){
        return roomService.updateRoom(id, room);
    }

    // Delete room
    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
    }

    // Get all bookings
    @GetMapping("/bookings")
    public List<BookingModel> getAllBooking(){
        return bookingService.getAllBookings();
    }
}