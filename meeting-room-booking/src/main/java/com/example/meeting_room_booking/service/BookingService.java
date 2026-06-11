package com.example.meeting_room_booking.service;

import com.example.meeting_room_booking.dto.BookingRequestDTO;
import com.example.meeting_room_booking.model.Booking;
import com.example.meeting_room_booking.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking createBooking(BookingRequestDTO request) {
        List<Booking> conflicts = bookingRepository.findConflicts(
                request.getRoomId(),
                request.getStartTime(),
                request.getEndTime()
        );
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room already booked for this time slot!");
        }
        Booking booking = new Booking();
        booking.setRoomId(request.getRoomId());
        booking.setRoomName(request.getRoomName());
        booking.setUserId(request.getUserId());
        booking.setUserName(request.getUserName());
        booking.setTitle(request.getTitle());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setAttendees(request.getAttendees());
        booking.setStatus("Upcoming");
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}