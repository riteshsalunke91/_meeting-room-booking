package com.example.meeting_room_booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomName;
    private String location;
    private int capacity;
    private String status;
    private String image;

    @Column(length = 500)
    private String description;

    // ── Constructors ──────────────────────────
    public Room() {}

    // ── Getters ───────────────────────────────
    public Long getId()         
     { return id; }
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
    public void setId(Long id)              { this.id = id; }
    public void setRoomName(String n)       { this.roomName = n; }
    public void setLocation(String l)       { this.location = l; }
    public void setCapacity(int c)          { this.capacity = c; }
    public void setStatus(String s)         { this.status = s; }
    public void setImage(String i)          { this.image = i; }
    public void setDescription(String d)    { this.description = d; }
}