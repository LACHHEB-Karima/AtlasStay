package web.atlasstay.backend.Controllers;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Dtos.BookingRequest;
import web.atlasstay.backend.Entities.User;
import web.atlasstay.backend.Exceptions.BookingNotFoundException;
import web.atlasstay.backend.Services.Implementations.UserDetailsServiceImp;
import web.atlasstay.backend.Services.Interfaces.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final UserDetailsServiceImp userDetailsServiceImp;

    // Create a new booking
    @PostMapping
    public ResponseEntity<Long> createBooking(@Valid @RequestBody BookingRequest bookingRequest) {
        // Get the currently authenticated user's email from the security context
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch user from UserDetailsService using email (username)
        User user = (User) userDetailsServiceImp.loadUserByUsername(username); // Ensure user is retrieved as a User entity

        try {
            Long bookingId = bookingService.saveBooking(bookingRequest, user);
            return new ResponseEntity<>(bookingId, HttpStatus.CREATED);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Get details of a specific booking by ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId) {
        try {
            BookingDTO bookingDTO = bookingService.getBookingById(bookingId);
            return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
        } catch (BookingNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Confirm a booking by its confirmation code
    @PostMapping("/confirm")
    public ResponseEntity<Void> confirmBooking(@RequestParam String confirmationCode) {
        try {
            bookingService.confirmBooking(confirmationCode);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a booking by its ID
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (BookingNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Find booking by confirmation code
    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<BookingDTO> findBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookingDTO bookingDTO = bookingService.findBookingByConfirmationCode(confirmationCode);
            return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
        } catch (BookingNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
