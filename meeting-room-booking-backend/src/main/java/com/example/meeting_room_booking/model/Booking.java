package com.example.meeting_room_booking.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long roomId;
    private String roomName;
    private Long userId;
    private String userName;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private int attendees;

    // ── Constructor ───────────────────────────
    public Booking() {}

    // ── Getters ───────────────────────────────
    public Long getId()                
     { return id; }
    public Long getRoomId()           
      { return roomId; }
    public String getRoomName()         
    { return roomName; }
    public Long getUserId()      
           { return userId; }
    public String getUserName()  
           { return userName; }
    public String getTitle()
                { return title; }
    public LocalDateTime getStartTime()
     { return startTime; }
    public LocalDateTime getEndTime()  
     { return endTime; }
    public String getStatus()
               { return status; }
    public int getAttendees()     
          { return attendees; }

    // ── Setters ───────────────────────────────
    public void setId(Long id)
                          { this.id = id; }
    public void setRoomId(Long roomId)
                  { this.roomId = roomId; }
    public void setRoomName(String roomName)   
         { this.roomName = roomName; }
    public void setUserId(Long userId)   
               { this.userId = userId; }
    public void setUserName(String userName)
            { this.userName = userName; }
    public void setTitle(String title)        
          { this.title = title; }
    public void setStartTime(LocalDateTime start)
       { this.startTime = start; }
    public void setEndTime(LocalDateTime end)
           { this.endTime = end; }
    public void setStatus(String status)  
              { this.status = status; }
    public void setAttendees(int attendees)  
           { this.attendees = attendees; }
}




