package com.example.meeting_room_booking.dto;

public class RoomRequestDTO {

    private String roomName;
    private String location;
    private int capacity;
    private String status;
    private String image;
    private String description;

    // ── Getters ───────────────────────────────
    public String getRoomName()     
    { return roomName; }
    public String getLocation()     
    { return location; }
    public int getCapacity()       
     { return capacity; }
    public String getStatus()       
    { return status; }
    public String getImage()        
    { return image; }
    public String getDescription()  
    { return description; }

    // ── Setters ───────────────────────────────
    public void setRoomName(String roomName)       
     { this.roomName = roomName; }
    public void setLocation(String location)       
     { this.location = location; }
    public void setCapacity(int capacity)           
    { this.capacity = capacity; }
    public void setStatus(String status)            
    { this.status = status; }
    public void setImage(String image)              
    { this.image = image; }
    public void setDescription(String description)  
    { this.description = description; }
}


