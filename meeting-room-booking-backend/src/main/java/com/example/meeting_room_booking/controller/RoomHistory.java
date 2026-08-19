package com.example.meeting_room_booking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.example.meeting_room_booking.service.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


// @Controller
// @RestController("api/history")

// public class RoomHistory {

//     private final AuthController authController;
//     public RoomService roomService;

//     RoomHistory(AuthController authController) {
//         this.authController = authController;
//     }

//     @GetMapping
//     public ResposeEntity<T> getAll(@RequestBody RoomhistoryRequestDto Request  ){
//         return ResponseEntity<T>.ok(RoomHistoryService.roomhistory())
//     }
//     }
    

