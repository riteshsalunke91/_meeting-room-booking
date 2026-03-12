package com.example.meeting_room_booking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.meeting_room_booking.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{

Optional<UserModel> findByEmail(String email);

boolean existsByEmail(String email);

}