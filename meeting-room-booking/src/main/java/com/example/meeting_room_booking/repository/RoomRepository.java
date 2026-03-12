package com.example.meeting_room_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.meeting_room_booking.model.RoomModel;

@Repository
public interface RoomRepository extends JpaRepository<RoomModel, Long> {

}
