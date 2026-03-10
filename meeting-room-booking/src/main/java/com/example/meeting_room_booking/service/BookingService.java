package com.example.meeting_room_booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.BookingModel;
import com.example.meeting_room_booking.repository.BookingRepository;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.meeting_room_booking.model.BookingModel;
// import com.example.meeting_room_booking.repository.BookingRepository;

// @Service
// public class BookingService {

//     @Autowired
//     private BookingRepository bookingRepository;

//     public BookingModel createBooking(BookingModel booking){

//         List<BookingModel> existingBookings =
//                 bookingRepository.findByRoomId(booking.getRoomId());

//         for(BookingModel b : existingBookings){

//             if(b.getStartTime().equals(booking.getStartTime())){
//                 throw new RuntimeException("Room already booked at this time");
//             }
//         }

//         return bookingRepository.save(booking);
//     }

//     public void cancelBooking(Long id){
//         bookingRepository.deleteById(id);
//     }

//     public List<BookingModel> getUserBookings(Long userId){
//         return bookingRepository.findByUserId(userId);
//     }
//     public List<BookingModel> getAllBookings(){
//     return bookingRepository.findAll();
// }
// }

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public BookingModel createBooking(BookingModel booking){

        List<BookingModel> existingBookings =
                bookingRepository.findByRoomId(booking.getRoomId());

        for(BookingModel b : existingBookings){

            boolean overlap =
                booking.getStartTime().isBefore(b.getEndTime()) &&
                booking.getEndTime().isAfter(b.getStartTime());

            if(overlap){
                throw new RuntimeException("Room already booked for this time");
            }

        }

        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long id){
        bookingRepository.deleteById(id);
    }

    public List<BookingModel> getUserBookings(Long userId){
        return bookingRepository.findByUserId(userId);
    }

    public List<BookingModel> getAllBookings(){
        return bookingRepository.findAll();
    }
}