package com.example.meeting_room_booking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.meeting_room_booking.model.BookingModel;


// @Repository
// public interface BookingRepository extends JpaRepository<BookingModel, Long> {
// List<BookingModel> findByUserId(Long userId);

//     List<BookingModel> findByRoomId(Long roomId);
    
// } 

// @Repository
// public interface BookingRepository extends JpaRepository<BookingModel, Long> {

//     List<BookingModel> findByUserId(Long userId);

//     List<BookingModel> findByRoomId(Long roomId);

//     List<BookingModel> findByRoomIdAndDate(Long roomId, LocalDate date);

//}

@Repository
public interface BookingRepository extends JpaRepository<BookingModel, Long>{

    List<BookingModel> findByRoom_Id(Long roomId);

    List<BookingModel> findByUser_Id(Long userId);

}

