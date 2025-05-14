package web.atlasstay.backend.Dtos;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private BigDecimal totalPrice;
    private String bookingConfirmationCode;
    private String status;
    private RoomDTO room;
    public int getTotalNumOfGuest() {
        return numOfAdults + numOfChildren;
    }
}

