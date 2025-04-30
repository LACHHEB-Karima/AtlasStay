package web.atlasstay.backend.Dtos;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingDTO {

    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numOfAdults;
    private int numOfChildren;
    private String bookingConfirmationCode;
    private String status;
    private Long roomId;
    private UUID userId;
    public int getTotalNumOfGuest() {
        return numOfAdults + numOfChildren;
    }
}

