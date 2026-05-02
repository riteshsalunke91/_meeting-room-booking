package com.example.meeting_room_booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meeting_room_booking.model.BookingModel;
import com.example.meeting_room_booking.repository.BookingRepository;

// import jakarta.persistence.Id;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public BookingModel createBooking(BookingModel booking){

        Long roomId = booking.getRoom().getId();

        List<BookingModel> existingBookings =
                bookingRepository.findByRoom_Id(roomId);

        for(BookingModel b : existingBookings){

            if(booking.getDate().equals(b.getDate())){

                boolean overlap =
                    booking.getStartTime().isBefore(b.getEndTime()) &&
                    booking.getEndTime().isAfter(b.getStartTime());

                if(overlap){
                    throw new RuntimeException("Room already booked for this time");
                }

            }
        }

        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long id){
        bookingRepository.deleteById(id);
    }

    public List<BookingModel> getUserBookings(Long userId){
        return bookingRepository.findByUser_Id(userId);
    }

    public List<BookingModel> getAllBookings(){
        return bookingRepository.findAll();
    }
}