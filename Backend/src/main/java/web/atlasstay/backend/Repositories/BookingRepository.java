package web.atlasstay.backend.Repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.atlasstay.backend.Entities.Booking;
import web.atlasstay.backend.Entities.BookingStatus;
import web.atlasstay.backend.Entities.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.room.id = :roomId AND (b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)")
    int countOverlappingBookings(@Param("roomId") Long roomId,
                                 @Param("checkInDate") LocalDate checkInDate,
                                 @Param("checkOutDate") LocalDate checkOutDate);

    @Modifying
    @Transactional
    @Query("DELETE FROM Booking b WHERE b.status = 'PENDING' AND b.createdAt <= :cutoff")
    int deletePendingBookingsOlderThan(@Param("cutoff") LocalDateTime cutoff);

    List<Booking> findByUserAndStatus(User user, BookingStatus status);

}
