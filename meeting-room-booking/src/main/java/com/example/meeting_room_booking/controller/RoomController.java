
package com.example.meeting_room_booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.meeting_room_booking.model.RoomModel;
// import com.example.meeting_room_booking.repository.RoomRepository;
import com.example.meeting_room_booking.service.RoomService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/room")
public class RoomController { 

    @Autowired
    private RoomService roomService;

    // Get all rooms


    @GetMapping
    public List<RoomModel> getAllRooms(){
        return roomService.getAllRooms();
    }

    // Get room by id
    @GetMapping("/{id}")
    public RoomModel getRoomById(@PathVariable Long id)
    {
        return roomService.getRoomById(id);
    }

    // Check room availability
    @GetMapping("/available")
    public List<RoomModel> checkAvailability(){
        return roomService.checkAvailability();
    }
}


