package com.example.meeting_room_booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // ✅ LOGIN
    public UserModel login(String email, String password){

        UserModel user = repo.findByEmail(email).orElse(null);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Wrong password");
        }

        return user; // 
    }

    // ✅ REGISTER
    public UserModel register(String name, String email, String password){

        if(repo.findByEmail(email).isPresent()){
            throw new RuntimeException("Email already in use");
        }

        UserModel user = new UserModel();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole("USER"); // optional

        return repo.save(user);
    }

    // ✅ LOGOUT
    public void logout(String email) {
        // For now simple logout
        System.out.println("User logged out: " + email);
    }
}