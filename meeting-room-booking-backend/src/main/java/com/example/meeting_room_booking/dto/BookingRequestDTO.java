package com.example.meeting_room_booking.dto;

import java.time.LocalDateTime;

public class BookingRequestDTO {

    private Long roomId;
    private String roomName;
    private Long userId;
    private String userName;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int attendees;


//getter
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
    public int getAttendees()               
    { return attendees; }


    //setter
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
    public void setAttendees(int attendees)         
    { this.attendees = attendees; }
}