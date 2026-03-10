package com.example.meeting_room_booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.meeting_room_booking.model.BookingModel;

public interface BookingRepository extends JpaRepository<BookingModel, Long> {
List<BookingModel> findByUserId(Long userId);

    List<BookingModel> findByRoomId(Long roomId);
    
} 