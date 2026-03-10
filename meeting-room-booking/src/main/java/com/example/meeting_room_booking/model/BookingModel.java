package com.example.meeting_room_booking.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long roomId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setUserId(Long userId){
    this.userId = userId;
}

public void setRoomId(Long roomId){
    this.roomId = roomId;
}

public void setDate(LocalDate date){
    this.date = date;
}

public void setStartTime(LocalTime startTime){
    this.startTime = startTime;
}

public void setEndTime(LocalTime endTime){
    this.endTime = endTime;
}
}