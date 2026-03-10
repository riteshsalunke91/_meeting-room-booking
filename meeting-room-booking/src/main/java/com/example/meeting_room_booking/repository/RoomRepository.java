package com.example.meeting_room_booking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.meeting_room_booking.model.RoomModel;
import com.example.meeting_room_booking.model.UserModel;

public interface RoomRepository extends JpaRepository<RoomModel, Long> {

}
    

