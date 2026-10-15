package com.example.meeting_room_booking.repository;

// import com.example.meeting_room_booking.model.Booking;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.time.LocalDateTime;
// import java.util.List;

// public interface BookingRepository extends JpaRepository<Booking, Long> {

//     // Get bookings of a particular user
//     List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);


//     // Find conflicting bookings
//     @Query("""
//         SELECT b
//         FROM Booking b
//         WHERE b.room.id = :roomId
//           AND b.status <> 'CANCELLED'
//           AND b.startTime < :endTime
//           AND b.endTime > :startTime
//     """)
//     List<Booking> findConflicts(
//             @Param("roomId") Long roomId,
//             @Param("startTime") LocalDateTime startTime,
//             @Param("endTime") LocalDateTime endTime
//     );


//     // Check whether a room is already booked
//     @Query("""
//         SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END
//         FROM Booking b
//         WHERE b.room.id = :roomId
//           AND b.status <> 'CANCELLED'
//           AND b.startTime < :endTime
//           AND b.endTime > :startTime
//     """)
//     boolean existsConflict(
//             @Param("roomId") Long roomId,
//             @Param("startTime") LocalDateTime startTime,
//             @Param("endTime") LocalDateTime endTime
//     );
// }



import com.example.meeting_room_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // =========================
    // GET USER BOOKINGS
    // =========================

    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);


    // =========================
    // FIND CONFLICTS
    // =========================

    @Query("""
        SELECT b
        FROM Booking b
        WHERE b.room.id = :roomId
          AND b.status <> 'CANCELLED'
          AND b.startTime < :endTime
          AND b.endTime > :startTime
    """)
    List<Booking> findConflicts(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );


    // =========================
    // CHECK CONFLICT
    // =========================

    @Query("""
        SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END
        FROM Booking b
        WHERE b.room.id = :roomId
          AND b.status <> 'CANCELLED'
          AND b.startTime < :endTime
          AND b.endTime > :startTime
    """)
    boolean existsConflict(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}