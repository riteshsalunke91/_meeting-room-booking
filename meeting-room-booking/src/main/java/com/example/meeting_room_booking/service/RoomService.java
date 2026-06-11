package com.example.meeting_room_booking.service;

import com.example.meeting_room_booking.dto.RoomRequestDTO;
import com.example.meeting_room_booking.model.Room;
import com.example.meeting_room_booking.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("AVAILABLE");
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room createRoom(RoomRequestDTO request) {
        Room room = new Room();
        room.setRoomName(request.getRoomName());
        room.setLocation(request.getLocation());
        room.setCapacity(request.getCapacity());
        room.setStatus(request.getStatus() != null
                ? request.getStatus() : "AVAILABLE");
        room.setImage(request.getImage());
        room.setDescription(request.getDescription());
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, RoomRequestDTO request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomName(request.getRoomName());
        room.setLocation(request.getLocation());
        room.setCapacity(request.getCapacity());
        room.setStatus(request.getStatus());
        room.setImage(request.getImage());
        room.setDescription(request.getDescription());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }
        roomRepository.deleteById(id);
    }
}