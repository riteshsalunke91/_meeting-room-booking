package com.example.meeting_room_booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.repository.UserRepository;



@Service
public class UserService {

@Autowired
private UserRepository repo;

// public UserModel login(String email,String password){

// UserModel user = repo.findByEmail(email).orElse(null);

// if(user==null){
// throw new RuntimeException("User not found");
// }

// if(!user.getPassword().equals(password)){
// throw new RuntimeException("Wrong password");
// }

// return user;
// }

public UserModel login(String email, String password){

    if(email == null || email.isEmpty() || password == null || password.isEmpty()){
        throw new RuntimeException("Email and Password required");
    }

    UserModel user = repo.findByEmail(email).orElse(null);

    if(user == null){
        throw new RuntimeException("User not found");
    }

    if(!user.getPassword().equals(password)){
        throw new RuntimeException("Wrong password");
    }

    return user;
}

}