
package com.example.meeting_room_booking.repository;

// import com.example.meeting_room_booking.model.User;
// import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.Optional;

// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByEmail(String email);
//     boolean existsByEmail(String email);
// }

import com.example.meeting_room_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // ✅ Check employee ID is unique
    boolean existsByEmployeeId(String employeeId);
}