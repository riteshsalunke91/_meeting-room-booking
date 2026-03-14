package com.example.meeting_room_booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.UserModel;
import com.example.meeting_room_booking.repository.UserRepository;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     public UserModel registerUser(UserModel user){
//         return userRepository.save(user);
//     }
    

//     public UserModel login(String email, String password){

//         UserModel user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         if(!user.getPassword().equals(password)){
//             throw new RuntimeException("Invalid password");
//         }

//         return user;
//     }

    
// }


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel registerUser(UserModel user){
        return userRepository.save(user);
    }

    public UserModel login(String email, String password){

        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

}