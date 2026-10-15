package com.example.meeting_room_booking.model;

// import jakarta.persistence.*;
// import lombok.Getter;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "bookings")
// public class Booking {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private Room roomId;
//     private String roomName;
//     private Long userId;
//     private String userName;
//     private String title;
//     private LocalDateTime startTime;
//     private LocalDateTime endTime;
//     private String status;
//     private int attendees;


//     // ── Constructor ───────────────────────────
//     public Booking() {}

// //     // ── Getters ───────────────────────────────
//     public Long getId()                
//      { return id; }
//     public Room getRoomId()           
//       { return roomId; }
//     public String getRoomName()         
//     { return roomName; }
//     public Long getUserId()      
//            { return userId; }
//     public String getUserName()  
//            { return userName; }
//     public String getTitle()
//                 { return title; }
//     public LocalDateTime getStartTime()
//      { return startTime; }
//     public LocalDateTime getEndTime()  
//      { return endTime; }
//     public String getStatus()
//                { return status; }
//     public int getAttendees()     
//           { return attendees; }

// //     // ── Setters ───────────────────────────────
//     public void setId(Long id)
//                           { this.id = id; }
//     public void setRoomId(Room room)
//                   { this.roomId = room; }
//     public void setRoomName(String roomName)   
//          { this.roomName = roomName; }
//     public void setUserId(User user)   
//                { this.userId = userId; }
//     public void setUserName(String userName)
//             { this.userName = userName; }
//     public void setTitle(String title)        
//           { this.title = title; }
//     public void setStartTime(LocalDateTime start)
//        { this.startTime = start; }
//     public void setEndTime(LocalDateTime end)
//            { this.endTime = end; }
//     public void setStatus(String status)  
//               { this.status = status; }
//     public void setAttendees(int attendees)  
//            { this.attendees = attendees; }
// }





import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String name;

    // Many bookings can belong to one room
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    // Many bookings can belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String status;

    private int attendees;

    private BigDecimal feePaid;

    private LocalDateTime createdAt;

    private LocalDateTime cancelledAt;


    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public Room getRoom() {
        return room;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public String getStatus() {
        return status;
    }

    public int getAttendees() {
        return attendees;
    }

    public BigDecimal getFeePaid() {
        return feePaid;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getCancelledAt() {
        return cancelledAt;
    }


    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    public void setFeePaid(BigDecimal feePaid) {
        this.feePaid = feePaid;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setCancelledAt(LocalDateTime cancelledAt) {
        this.cancelledAt = cancelledAt;
    }
}