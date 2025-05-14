package web.atlasstay.backend.Dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AvailabilityCheckRequest{
        private Long roomId;
        private LocalDate checkInDate;
        private LocalDate checkOutDate;
}
