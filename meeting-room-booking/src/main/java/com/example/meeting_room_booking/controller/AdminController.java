
package com.example.meeting_room_booking.controller;

import java.util.List;

import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.RoomModel;
// import com.example.meeting_room_booking.repository.BookingRepository;
//import com.example.meeting_room_booking.repository.RoomRepository;
import com.example.meeting_room_booking.model.BookingModel;
 import com.example.meeting_room_booking.service.RoomService;
 import com.example.meeting_room_booking.service.BookingService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    // ADD ROOM
    @PostMapping("/rooms")
    public RoomModel addRoom(@RequestBody RoomModel room){
        return roomService.addRoom(room);
    }

    // GET ROOMS
    @GetMapping("/rooms")
    public List<RoomModel> getRooms(){
        return roomService.getAllRooms();
    }

    // UPDATE ROOM
    @PutMapping("/rooms/{id}")
    public RoomModel updateRoom(@PathVariable Long id, @RequestBody RoomModel room){
        return roomService.updateRoom(id, room);
    }

    // DELETE ROOM
    @DeleteMapping("/rooms/{id}")
    public String deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
        return "Deleted";
    }

    // ALL BOOKINGS
    @GetMapping("/bookings")
    public List<BookingModel> getAllBookings(){
        return bookingService.getAllBookings();
    }

    // ALL USERS (ADMIN FEATURE)
    @GetMapping("/users")
    public List<UserModel> getAllUsers(){
        return userRepository.findAll();
    }
}
