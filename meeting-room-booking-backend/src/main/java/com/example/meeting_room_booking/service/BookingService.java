package com.example.meeting_room_booking.service;

import com.example.meeting_room_booking.dto.BookingRequestDTO;
import com.example.meeting_room_booking.dto.Response.BookingResponseDTO;
import com.example.meeting_room_booking.model.Booking;
import com.example.meeting_room_booking.model.Room;
import com.example.meeting_room_booking.model.User;
import com.example.meeting_room_booking.repository.BookingRepository;
import com.example.meeting_room_booking.repository.RoomRepository;
import com.example.meeting_room_booking.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RoomRepository roomRepository,
            UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }


    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    public List<BookingResponseDTO> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BOOKINGS BY USER
    // =====================================================

    public List<BookingResponseDTO> getBookingsByUser(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return bookingRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    // =====================================================
    // CREATE BOOKING
    // =====================================================

    public BookingResponseDTO createBooking(
            BookingRequestDTO request) {

        // Check start/end time
        if (request.getStartTime() == null ||
                request.getEndTime() == null) {

            throw new RuntimeException(
                    "Start time and end time are required");
        }

        // End must be after start
        if (!request.getEndTime()
                .isAfter(request.getStartTime())) {

            throw new RuntimeException(
                    "End time must be after start time");
        }


        // -------------------------------------------------
        // Find Room
        // -------------------------------------------------

        Room room = roomRepository
                .findById(request.getRoomId())
                .orElseThrow(() ->
                        new RuntimeException("Room not found"));


        // -------------------------------------------------
        // Find User
        // -------------------------------------------------

        User user = userRepository
                .findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // -------------------------------------------------
        // Check Booking Conflict
        // -------------------------------------------------

        boolean conflict = bookingRepository.existsConflict(
                request.getRoomId(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (conflict) {

            throw new RuntimeException(
                    "Room '" +
                    room.getRoomName() +
                    "' is already booked for this time slot!"
            );
        }


        // -------------------------------------------------
        // Create Booking
        // -------------------------------------------------

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setRoom(room);

        booking.setTitle(request.getTitle());

        booking.setStartTime(
                request.getStartTime());

        booking.setEndTime(
                request.getEndTime());

        booking.setAttendees(
                request.getAttendees() != null
                        ? request.getAttendees()
                        : 1
        );

        booking.setStatus("CONFIRMED");

        // Save room fee at booking time
        booking.setId(room.getId());

        booking.setCreatedAt(
                LocalDateTime.now());

        booking.setCancelledAt(null);


        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        Booking savedBooking =
                bookingRepository.save(booking);


        return mapToDTO(savedBooking);
    }


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    public String cancelBooking(Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));


        if ("CANCELLED".equalsIgnoreCase(
                booking.getStatus())) {

            throw new RuntimeException(
                    "Booking is already cancelled");
        }


        booking.setStatus("CANCELLED");

        booking.setCancelledAt(
                LocalDateTime.now());

        bookingRepository.save(booking);


        return "Booking cancelled successfully";
    }


    // =====================================================
    // MAP BOOKING → DTO
    // =====================================================

    private BookingResponseDTO mapToDTO(
            Booking booking) {

        BookingResponseDTO dto =
                new BookingResponseDTO();


        // Booking
        dto.setId(booking.getId());


        // Room
        if (booking.getRoom() != null) {

            dto.setRoomId(
                    booking.getRoom().getId());

            dto.setRoomName(
                    booking.getRoom().getRoomName());

            dto.setLocation(
                    booking.getRoom().getLocation());
        }


        // User
        if (booking.getUser() != null) {

            dto.setUserId(
                    booking.getUser().getId());

            dto.setUserName(
                    booking.getUser().getFirstName());
        }


        // Booking details
        dto.setTitle(booking.getTitle());

        dto.setStatus(booking.getStatus());

        dto.setAttendees(
                booking.getAttendees());

        dto.setFeePaid(
                booking.getFeePaid());


        // Date format
        DateTimeFormatter dateFormatter =
                DateTimeFormatter.ofPattern(
                        "dd MMM yyyy");

        // Time format
        DateTimeFormatter timeFormatter =
                DateTimeFormatter.ofPattern(
                        "hh:mm a");


        if (booking.getStartTime() != null) {

            dto.setDate(
                    booking.getStartTime()
                            .format(dateFormatter));

            dto.setStartTime(
                    booking.getStartTime()
                            .format(timeFormatter));

            dto.setStartISO(
                    booking.getStartTime()
                            .toString());
        }


        if (booking.getEndTime() != null) {

            dto.setEndTime(
                    booking.getEndTime()
                            .format(timeFormatter));

            dto.setEndISO(
                    booking.getEndTime()
                            .toString());
        }


        return dto;
    }
}