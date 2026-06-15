package com.example.meeting_room_booking.dto;

public class LoginResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String department;
    private String employeeId;
    private String phone;
    private String memberSince;

    public Long getId()             
    { return id; }
    public String getFirstName()    
    { return firstName; }
    public String getLastName()     
    { return lastName; }
    public String getEmail()        
    { return email; }
    public String getRole()         
    { return role; }
    public String getDepartment()  
     { return department; }
    public String getEmployeeId()   
    { return employeeId; }
    public String getPhone()        
    { return phone; }
    public String getMemberSince()  
    { return memberSince; }

    public void setId(Long id)                     
     { this.id = id; }
    public void setFirstName(String firstName)      
    { this.firstName = firstName; }
    public void setLastName(String lastName)        
    { this.lastName = lastName; }
    public void setEmail(String email)             
     { this.email = email; }
    public void setRole(String role)                
    { this.role = role; }
    public void setDepartment(String department)    
    { this.department = department; }
    public void setEmployeeId(String employeeId)    
    { this.employeeId = employeeId; }
    public void setPhone(String phone)              
    { this.phone = phone; }
    public void setMemberSince(String memberSince)  
    { this.memberSince = memberSince; }
}