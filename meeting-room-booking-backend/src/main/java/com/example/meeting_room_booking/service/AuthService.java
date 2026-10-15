package com.example.meeting_room_booking.service;

// import com.example.meeting_room_booking.dto.LoginRequestDTO;
// import com.example.meeting_room_booking.dto.LoginResponseDTO;
// import com.example.meeting_room_booking.dto.RegisterRequestDTO;
// import com.example.meeting_room_booking.model.User;
// import com.example.meeting_room_booking.repository.UserRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.time.format.DateTimeFormatter;

// @Service
// public class AuthService {

//     private final UserRepository userRepository;

//     public AuthService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     // REGISTER
//     public LoginResponseDTO register(RegisterRequestDTO request) {

//         if (userRepository.existsByEmail(request.getEmail())) {
//             throw new RuntimeException("Email already registered");
//         }

//         User user = new User();
//         user.setFirstName(request.getFirstName());
//         user.setLastName(request.getLastName());
//         user.setEmail(request.getEmail());
//         user.setPassword(request.getPassword());
//         user.setDepartment(request.getDepartment());
//         user.setEmployeeId(request.getEmployeeId());
//         user.setPhone(request.getPhone());
//         user.setRole("USER");
//         user.setMemberSince(
//                 LocalDate.now()
//                         .format(DateTimeFormatter.ofPattern("dd MMMM yyyy"))
//         );

//         user = userRepository.save(user);

//         return mapToDTO(user);
//     }

//     //employee id

//    user.setEmployeeId(generate EmployeeId());

//    //

//     // LOGIN
//     public LoginResponseDTO login(LoginRequestDTO request) {

       
//         System.out.println("Email from frontend: [" + request.getEmail() + "]");
// System.out.println("Password from frontend: [" + request.getPassword() + "]");

// User user = userRepository.findByEmail(request.getEmail())
//         .orElseThrow(() ->
//             new RuntimeException("Invalid email or password"));

// System.out.println("Email from DB: [" + user.getEmail() + "]");
// System.out.println("Password from DB: [" + user.getPassword() + "]");

//         if (!user.getPassword().equals(request.getPassword())) {
//             throw new RuntimeException("Invalid email or password");
//         }

//         return mapToDTO(user);
//     }

//     // GET USER BY ID
//     public LoginResponseDTO getUserById(Long id) {

//         User user = userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new RuntimeException("User not found"));

//         return mapToDTO(user);
//     }

//     // UPDATE USER
//     public LoginResponseDTO updateUser(Long id, RegisterRequestDTO request) {

//         User user = userRepository.findById(id)
//                 .orElseThrow(() ->
//                         new RuntimeException("User not found"));

//         if (request.getFirstName() != null)
//             user.setFirstName(request.getFirstName());

//         if (request.getLastName() != null)
//             user.setLastName(request.getLastName());

//         if (request.getEmail() != null)
//             user.setEmail(request.getEmail());

//         if (request.getPhone() != null)
//             user.setPhone(request.getPhone());

//         if (request.getDepartment() != null)
//             user.setDepartment(request.getDepartment());

//         if (request.getEmployeeId() != null)
//             user.setEmployeeId(request.getEmployeeId());

//         if (request.getPassword() != null &&
//                 !request.getPassword().trim().isEmpty()) {
//             user.setPassword(request.getPassword());
//         }

//         user = userRepository.save(user);

//         return mapToDTO(user);
//     }

//     // CONVERT USER TO DTO
//     private LoginResponseDTO mapToDTO(User user) {

//         LoginResponseDTO dto = new LoginResponseDTO();

//         dto.setId(user.getId());
//         dto.setFirstName(user.getFirstName());
//         dto.setLastName(user.getLastName());
//         dto.setEmail(user.getEmail());
//         dto.setRole(user.getRole());
//         dto.setDepartment(user.getDepartment());
//         dto.setEmployeeId(user.getEmployeeId());
//         dto.setPhone(user.getPhone());
//         dto.setMemberSince(user.getMemberSince());

//         return dto;
//     }
// }





import com.example.meeting_room_booking.dto.*;
import com.example.meeting_room_booking.model.User;
import com.example.meeting_room_booking.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ── REGISTER — auto generates employee ID ──────
    public LoginResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already registered");

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setDepartment(request.getDepartment());
        user.setRole("USER");

        // ✅ Auto-generate Employee ID
        user.setEmployeeId(generateEmployeeId());

        // ✅ Set member since date
        user.setMemberSince(
            LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy"))
        );

        user = userRepository.save(user);
        return mapToDTO(user);
    }

    // ── LOGIN ──────────────────────────────────────
    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword()))
            throw new RuntimeException("Invalid email or password");

        return mapToDTO(user);
    }

    // ── GET USER BY ID ─────────────────────────────
    public LoginResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDTO(user);
    }

    // ── UPDATE USER ────────────────────────────────
    public LoginResponseDTO updateUser(Long id, RegisterRequestDTO request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFirstName()  != null) user.setFirstName(request.getFirstName());
        if (request.getLastName()   != null) user.setLastName(request.getLastName());
        if (request.getEmail()      != null) user.setEmail(request.getEmail());
        if (request.getPhone()      != null) user.setPhone(request.getPhone());
        if (request.getDepartment() != null) user.setDepartment(request.getDepartment());
        if (request.getPassword()   != null &&
            !request.getPassword().trim().isEmpty())
            user.setPassword(request.getPassword());

        user = userRepository.save(user);
        return mapToDTO(user);
    }

    // ── AUTO GENERATE EMPLOYEE ID ──────────────────
    private String generateEmployeeId() {
        // Format: EMP-XXXX (e.g. EMP-4821)
        String empId;
        do {
            int number = 1000 + new Random().nextInt(9000);
            empId = "EMP-" + number;
        } while (userRepository.existsByEmployeeId(empId)); // ensure unique
        return empId;
    }

    // ── CONVERT TO DTO (no password) ───────────────
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


