package web.atlasstay.backend.Services.Implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import web.atlasstay.backend.Repositories.BookingRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingCleanupService {

    private final BookingRepository bookingRepository;

    //Delete PENDING bookings every hour
    @Scheduled(cron = "0 0 * * * *")
    public void deleteOldPendingBookings() {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        int deletedCount = bookingRepository.deletePendingBookingsOlderThan(oneHourAgo);
        log.info("Deleted {} pending bookings older than 1 hour.", deletedCount);
    }
}

