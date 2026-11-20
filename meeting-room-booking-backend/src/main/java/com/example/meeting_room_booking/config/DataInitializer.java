package com.example.meeting_room_booking.config;

import com.example.meeting_room_booking.model.Room;
import com.example.meeting_room_booking.model.User;
import com.example.meeting_room_booking.repository.RoomRepository;
import com.example.meeting_room_booking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public DataInitializer(UserRepository userRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedRooms();
    }

    private void seedUsers() {
        // Seed default Admin user if not present
        if (!userRepository.existsByEmail("admin@roombook.com")) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@roombook.com");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            admin.setDepartment("IT");
            admin.setEmployeeId("EMP-000");
            admin.setMemberSince("01 January 2025");
            userRepository.save(admin);
        }

        // Seed demo regular user if not present
        if (!userRepository.existsByEmail("gs1@gmail.com")) {
            User demoUser = new User();
            demoUser.setFirstName("Gs1");
            demoUser.setLastName("User");
            demoUser.setEmail("gs1@gmail.com");
            demoUser.setPassword("gs1123");
            demoUser.setRole("USER");
            demoUser.setDepartment("General");
            demoUser.setEmployeeId("EMP-1001");
            demoUser.setMemberSince("01 January 2025");
            userRepository.save(demoUser);
        }
    }

    private void seedRooms() {
        if (roomRepository.count() == 0) {
            Room r1 = new Room();
            r1.setRoomName("Conference Hall A");
            r1.setLocation("1st Floor");
            r1.setCapacity(10);
            r1.setStatus("AVAILABLE");
            r1.setImage("https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80");
            r1.setDescription("Modern conference room with projector");

            Room r2 = new Room();
            r2.setRoomName("Conference Hall B");
            r2.setLocation("2nd Floor");
            r2.setCapacity(20);
            r2.setStatus("AVAILABLE");
            r2.setImage("https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80");
            r2.setDescription("Large hall with video conferencing");

            Room r3 = new Room();
            r3.setRoomName("Meeting Room C");
            r3.setLocation("3rd Floor");
            r3.setCapacity(8);
            r3.setStatus("AVAILABLE");
            r3.setImage("https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&q=80");
            r3.setDescription("Cozy meeting room for small teams");

            Room r4 = new Room();
            r4.setRoomName("Board Room D");
            r4.setLocation("4th Floor");
            r4.setCapacity(15);
            r4.setStatus("AVAILABLE");
            r4.setImage("https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80");
            r4.setDescription("Executive boardroom with smart TV");

            roomRepository.saveAll(List.of(r1, r2, r3, r4));
        }
    }
}
