package web.atlasstay.backend.Dtos;

import java.time.LocalDate;

public record AvailabilityCheckRequest(
        Long roomId,
        LocalDate checkInDate,
        LocalDate checkOutDate
) {}
