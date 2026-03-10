package com.example.meeting_room_booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.RoomModel;
import com.example.meeting_room_booking.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public RoomModel addRoom(RoomModel room){
        return roomRepository.save(room);
    }

    public List<RoomModel> getAllRooms(){
        return roomRepository.findAll();
    }

    public RoomModel getRoomById(Long id){
        return roomRepository.findById(id).orElse(null);
    }

    public List<RoomModel> checkAvailability(){
        return roomRepository.findAll();
    }

    public RoomModel updateRoom(Long id, RoomModel room){
        room.setId(id);
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id){
        roomRepository.deleteById(id);
    }
}