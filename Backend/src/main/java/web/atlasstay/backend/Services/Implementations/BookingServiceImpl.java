package web.atlasstay.backend.Services.Implementations;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Dtos.BookingRequest;
import web.atlasstay.backend.Entities.*;
import web.atlasstay.backend.Exceptions.BookingNotFoundException;
import web.atlasstay.backend.Exceptions.OperationNotPermittedException;
import web.atlasstay.backend.Exceptions.RoomNotAvailableForThisPeriodException;
import web.atlasstay.backend.Exceptions.RoomNotFoundException;
import web.atlasstay.backend.Mappers.BookingMapper;
import web.atlasstay.backend.Repositories.BookingRepository;
import web.atlasstay.backend.Repositories.PaymentRepository;
import web.atlasstay.backend.Repositories.RoomRepository;
import web.atlasstay.backend.Services.Interfaces.BookingService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final EmailService emailService;
    private final PaymentRepository paymentRepository;
    private final BookingMapper bookingMapper;

    public Long saveBooking(BookingRequest bookingRequest, User user) {
        // Check if the room exists
        Room room = roomRepository.findById(bookingRequest.getRoomId())
                .orElseThrow(() -> new RoomNotFoundException("Room not found"));

        // Validate that the check-in date is before the check-out date
        if (bookingRequest.getCheckInDate().isAfter(bookingRequest.getCheckOutDate())) {
            throw new IllegalArgumentException("Check-in date must be before check-out date.");
        }

        // Check if the room is available for the given dates
        if (!isRoomAvailable(bookingRequest.getRoomId(), bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate())) {
            throw new RoomNotAvailableForThisPeriodException("This room is not available for the selected dates.");
        }

        // Create and save the booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setTotalPrice(bookingRequest.getTotalPrice());
        booking.setNumOfAdults(bookingRequest.getNumOfAdults());
        booking.setNumOfChildren(bookingRequest.getNumOfChildren());
        booking.setStatus(BookingStatus.PENDING);

        // Calculate total number of guests
        booking.calculateTotalNumberOfGuest();

        // Save the booking to the database
        bookingRepository.save(booking);

        return booking.getId();
    }

    //Method to save payment and confirm booking
    public void payBooking(Long bookingId, String paymentIntentId, User user) throws MessagingException {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You are not authorized to pay this booking.");
        }

        try {
            Stripe.apiKey = stripeSecretKey;

            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

            if (!"succeeded".equals(paymentIntent.getStatus())) {
                throw new RuntimeException("Payment not successful. Booking not confirmed.");
            }

            // Save payment
            Payment payment = new Payment();
            payment.setPaymentIntentId(paymentIntentId);
            payment.setAmountPaid(paymentIntent.getAmount());
            payment.setBooking(booking);
            log.info("Payment values:",paymentIntentId, paymentIntent.getAmount());
            paymentRepository.save(payment);

            // Confirm the booking
            booking.setStatus(BookingStatus.PAID);
            booking.setBookingConfirmationCode(generateConfirmationCode());
            bookingRepository.save(booking);

            // Send confirmation email
            emailService.sendEmail(
                    booking.getUser().getEmail(),
                    booking.getUser().getName(),
                    EmailTemplate.BOOKING_CONFIRMATION,
                    "",
                    booking.getBookingConfirmationCode(),
                    "Booking Confirmation - AtlasStay"
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to confirm booking: " + e.getMessage());
        }
    }

    // Helper method to generate a booking confirmation code
    private String generateConfirmationCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    @Override
    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
        return bookingMapper.toBookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingMapper.toBookingDTOList(bookingRepository.findAll());
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
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with the confirmation code: " + confirmationCode));
        return bookingMapper.toBookingDTO(booking);
    }

    public void confirmBooking(String confirmationCode) {
        Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new IllegalArgumentException("Invalid confirmation code"));

        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Booking already confirmed.");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

     public boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        return bookingRepository.countOverlappingBookings(roomId, checkIn, checkOut) == 0;
    }

    public List<BookingDTO> getMyPaidBookings(User user) {
        List<Booking> bookings = bookingRepository.findByUserAndStatus(user, BookingStatus.PAID);
        return bookingMapper.toBookingDTOList(bookings);
    }

}
