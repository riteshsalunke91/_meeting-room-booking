package com.example.meeting_room_booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // ✅ LOGIN METHOD
    // public UserModel login(String email, String password){

    //     UserModel user = repo.findByEmail(email).orElse(null);

    //     if(user == null){
    //         throw new RuntimeException("User not found");
    //     }

    //     if(!user.getPassword().equals(password)){
    //         throw new RuntimeException("Wrong password");
    //     }

    //     return user;
    // }

    public UserModel login(String email, String password){

    System.out.println("INPUT EMAIL: " + email);
    System.out.println("INPUT PASSWORD: " + password);

    UserModel user = repo.findByEmail(email).orElse(null);

    if(user == null){
        System.out.println("❌ USER NOT FOUND");
        throw new RuntimeException("User not found");
    }

    System.out.println("DB PASSWORD: " + user.getPassword());

    if(!user.getPassword().equals(password)){
        System.out.println("❌ PASSWORD MISMATCH");
        throw new RuntimeException("Wrong password");
    }

    return user;
}
}