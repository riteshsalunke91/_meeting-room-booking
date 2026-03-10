package com.example.meeting_room_booking.model;

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
private String availableDate;
private String startTime;
private String endTime;

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

public String getAvailableDate() {
    return availableDate;
}

public void setAvailableDate(String availableDate) {
    this.availableDate = availableDate;
}

public String getStartTime() {
    return startTime;
}

public void setStartTime(String startTime) {
    this.startTime = startTime;
}

public String getEndTime() {
    return endTime;
}

public void setEndTime(String endTime) {
    this.endTime = endTime;
}

}