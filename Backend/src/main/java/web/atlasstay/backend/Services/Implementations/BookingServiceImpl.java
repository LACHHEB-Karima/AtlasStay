package web.atlasstay.backend.Services.Implementations;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Dtos.BookingRequest;
import web.atlasstay.backend.Entities.*;
import web.atlasstay.backend.Exceptions.BookingNotFoundException;
import web.atlasstay.backend.Mappers.BookingMapper;
import web.atlasstay.backend.Repositories.BookingRepository;
import web.atlasstay.backend.Repositories.RoomRepository;
import web.atlasstay.backend.Services.Interfaces.BookingService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final EmailService emailService;

    public Long saveBooking(BookingRequest bookingRequest, User user) {
        // Check if the room exists
        Room room = roomRepository.findById(bookingRequest.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Validate that the check-in date is before the check-out date
        if (bookingRequest.getCheckInDate().isAfter(bookingRequest.getCheckOutDate())) {
            throw new IllegalArgumentException("Check-in date must be before check-out date.");
        }

        // Check if the room is available for the given dates
        if (!isRoomAvailable(bookingRequest.getRoomId(), bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
            throw new IllegalStateException("Room with ID " + bookingRequest.getRoomId() + " is not available for the selected dates.");
        }

        // Create and save the booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setNumOfAdults(bookingRequest.getNumOfAdults());
        booking.setNumOfChildren(bookingRequest.getNumOfChildren());
        booking.setStatus(BookingStatus.PENDING);

        // Calculate total number of guests
        booking.calculateTotalNumberOfGuest();

        // Save the booking to the database
        bookingRepository.save(booking);

        return booking.getId();
    }

    public void payBooking(Long bookingId, User user) throws MessagingException {
        // Retrieve the booking by ID
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Check if the user is authorized to pay this booking
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to pay this booking.");
        }

        // Update the booking status to PAID and generate a confirmation code
        booking.setStatus(BookingStatus.PAID);
        booking.setBookingConfirmationCode(generateConfirmationCode());
        bookingRepository.save(booking);

        // Send a booking confirmation email to the user
        emailService.sendEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName(),
                EmailTemplate.BOOKING_CONFIRMATION,  // Reference to booking confirmation template
                "", // Not needed here
                booking.getBookingConfirmationCode(),
                "Booking Confirmation - AtlasStay"
        );
    }

    // Helper method to generate a booking confirmation code
    private String generateConfirmationCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    @Override
    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
        return BookingMapper.toBookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return BookingMapper.toBookingDTOList(bookingRepository.findAll());
    }

    @Override
    public void deleteBooking(Long bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new BookingNotFoundException("Booking not found");
        }
        bookingRepository.deleteById(bookingId);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingDTO findBookingByConfirmationCode(String confirmationCode) {
        Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with confirmation code: " + confirmationCode));
        return BookingMapper.toBookingDTO(booking);
    }

    @Transactional
    public void confirmBooking(String confirmationCode) {
        Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new IllegalArgumentException("Invalid confirmation code"));

        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Booking already confirmed.");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    private boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        return bookingRepository.countOverlappingBookings(roomId, checkIn, checkOut) == 0;
    }

}
