
package com.example.meeting_room_booking.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
public class BookingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private LocalTime startTime;

    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name="room_id")
    private RoomModel room;

    // Getters

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public UserModel getUser() {
        return user;
    }

    public RoomModel getRoom() {
        return room;
    }

    // Setters

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public void setRoom(RoomModel room) {
        this.room = room;
    }

  

}