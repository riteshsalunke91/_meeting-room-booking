package com.example.meeting_room_booking.service;

import com.example.meeting_room_booking.dto.LoginRequestDTO;
import com.example.meeting_room_booking.dto.LoginResponseDTO;
import com.example.meeting_room_booking.dto.RegisterRequestDTO;
import com.example.meeting_room_booking.model.User;
import com.example.meeting_room_booking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER
    public LoginResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setDepartment(request.getDepartment());
        user.setEmployeeId(request.getEmployeeId());
        user.setPhone(request.getPhone());
        user.setRole("USER");
        user.setMemberSince(
                LocalDate.now()
                        .format(DateTimeFormatter.ofPattern("dd MMMM yyyy"))
        );

        user = userRepository.save(user);

        return mapToDTO(user);
    }

    // LOGIN
    public LoginResponseDTO login(LoginRequestDTO request) {

       
        System.out.println("Email from frontend: [" + request.getEmail() + "]");
System.out.println("Password from frontend: [" + request.getPassword() + "]");

User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() ->
            new RuntimeException("Invalid email or password"));

System.out.println("Email from DB: [" + user.getEmail() + "]");
System.out.println("Password from DB: [" + user.getPassword() + "]");

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return mapToDTO(user);
    }

    // GET USER BY ID
    public LoginResponseDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return mapToDTO(user);
    }

    // UPDATE USER
    public LoginResponseDTO updateUser(Long id, RegisterRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (request.getFirstName() != null)
            user.setFirstName(request.getFirstName());

        if (request.getLastName() != null)
            user.setLastName(request.getLastName());

        if (request.getEmail() != null)
            user.setEmail(request.getEmail());

        if (request.getPhone() != null)
            user.setPhone(request.getPhone());

        if (request.getDepartment() != null)
            user.setDepartment(request.getDepartment());

        if (request.getEmployeeId() != null)
            user.setEmployeeId(request.getEmployeeId());

        if (request.getPassword() != null &&
                !request.getPassword().trim().isEmpty()) {
            user.setPassword(request.getPassword());
        }

        user = userRepository.save(user);

        return mapToDTO(user);
    }

    // CONVERT USER TO DTO
    private LoginResponseDTO mapToDTO(User user) {

        LoginResponseDTO dto = new LoginResponseDTO();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setDepartment(user.getDepartment());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setPhone(user.getPhone());
        dto.setMemberSince(user.getMemberSince());

        return dto;
    }
}