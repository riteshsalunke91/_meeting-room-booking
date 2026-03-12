package com.example.meeting_room_booking.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RoomModel {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String roomName;
private String location;
private int capacity;
private LocalDate availableDate;
private LocalTime startTime;
private LocalTime endTime;

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getRoomName() {
    return roomName;
}

public void setRoomName(String roomName) {
    this.roomName = roomName;
}

public String getLocation() {
    return location;
}

public void setLocation(String location) {
    this.location = location;
}

public int getCapacity() {
    return capacity;
}

public void setCapacity(int capacity) {
    this.capacity = capacity;
}

public LocalDate getAvailableDate() {
    return availableDate;
}

public void setAvailableDate(LocalDate availableDate) {
    this.availableDate = availableDate;
}

public LocalTime getStartTime() {
    return startTime;
}

public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
}

public LocalTime getEndTime() {
    return endTime;
}

public void setEndTime(LocalTime endTime) {
    this.endTime = endTime;
}

}