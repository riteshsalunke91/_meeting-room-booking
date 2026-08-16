
package com.example.meeting_room_booking.repository;

import com.example.meeting_room_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);


   @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId " +
          "AND b.status != 'CANCELLED' " +
          "AND b.startTime < :endTime " +
          "AND b.endTime > :startTime")
    List<Booking> findConflicts(Long roomId,
                                LocalDateTime startTime,
                                LocalDateTime endTime);
}