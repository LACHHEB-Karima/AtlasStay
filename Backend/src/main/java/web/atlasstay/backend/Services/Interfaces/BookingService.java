package web.atlasstay.backend.Services.Interfaces;
import jakarta.mail.MessagingException;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Dtos.BookingRequest;
import web.atlasstay.backend.Entities.User;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    Long saveBooking(BookingRequest bookingRequest, User user);
    BookingDTO getBookingById(Long bookingId);
    List<BookingDTO> getAllBookings();
    void deleteBooking(Long bookingId);

    BookingDTO findBookingByConfirmationCode(String confirmationCode);
    void confirmBooking(String confirmationCode);
    boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut);
    void payBooking(Long bookingId, String paymentIntentId, User user) throws MessagingException;
    List<BookingDTO> getMyPaidBookings(User user);
}

