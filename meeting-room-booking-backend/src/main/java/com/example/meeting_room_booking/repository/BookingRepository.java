// package com.example.meeting_room_booking.repository;

// import java.time.LocalDate;
// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.example.meeting_room_booking.model.BookingModel;


// @Repository
// public interface BookingRepository extends JpaRepository<BookingModel, Long>{

//     List<BookingModel> findByRoom_Id(Long roomId);

//     List<BookingModel> findByUser_Id(Long userId);

// }

// repository/BookingRepository.java
package com.example.meeting_room_booking.repository;

import com.example.meeting_room_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    // Check for booking conflicts
    @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId " +
           "AND b.status != 'CANCELLED' " +
           "AND b.startTime < :endTime " +
           "AND b.endTime > :startTime")
    List<Booking> findConflicts(Long roomId,
                                LocalDateTime startTime,
                                LocalDateTime endTime);
}