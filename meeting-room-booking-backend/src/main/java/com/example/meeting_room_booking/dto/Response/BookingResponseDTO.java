package com.example.meeting_room_booking.dto.Response;


import java.math.BigDecimal;

public class BookingResponseDTO {

    private Long id;

    private Long roomId;
    private String roomName;
    private String location;

    private Long userId;
    private String userName;

    private String title;

    private String status;

    private int attendees;

    private BigDecimal feePaid;

    private String date;

    private String startTime;
    private String endTime;

    private String startISO;
    private String endISO;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
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


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }


    public BigDecimal getFeePaid() {
        return feePaid;
    }

    public void setFeePaid(BigDecimal feePaid) {
        this.feePaid = feePaid;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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


    public String getStartISO() {
        return startISO;
    }

    public void setStartISO(String startISO) {
        this.startISO = startISO;
    }


    public String getEndISO() {
        return endISO;
    }

    public void setEndISO(String endISO) {
        this.endISO = endISO;
    }
}