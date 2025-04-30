package web.atlasstay.backend.Dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numOfAdults;
    private int numOfChildren;
}
