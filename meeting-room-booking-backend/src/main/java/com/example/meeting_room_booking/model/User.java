package com.example.meeting_room_booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String role;
    private String department;
    private String employeeId;
    private String phone;
    private String memberSince;

    // ── Constructor ───────────────────────────
    public User() {}

    // ── Getters ───────────────────────────────
    public Long getId()             { return id; }
    public String getFirstName()    { return firstName; }
    public String getLastName()     { return lastName; }
    public String getEmail()        { return email; }
    public String getPassword()     { return password; }
    public String getRole()         { return role; }
    public String getDepartment()   { return department; }
    public String getEmployeeId()   { return employeeId; }
    public String getPhone()        { return phone; }
    public String getMemberSince()  { return memberSince; }

    // ── Setters ───────────────────────────────
    public void setId(Long id)                  { this.id = id; }
    public void setFirstName(String firstName)  { this.firstName = firstName; }
    public void setLastName(String lastName)    { this.lastName = lastName; }
    public void setEmail(String email)          { this.email = email; }
    public void setPassword(String password)    { this.password = password; }
    public void setRole(String role)            { this.role = role; }
    public void setDepartment(String dept)      { this.department = dept; }
    public void setEmployeeId(String empId)     { this.employeeId = empId; }
    public void setPhone(String phone)          { this.phone = phone; }
    public void setMemberSince(String date)     { this.memberSince = date; }
}