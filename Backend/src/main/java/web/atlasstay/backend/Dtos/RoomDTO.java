package web.atlasstay.backend.Dtos;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RoomDTO {

    private Long id;
    @NotBlank(message = "Room title is required")
    @Size(max = 50, message = "Room title cannot exceed 50 characters")
    private String roomTitle;

    @NotBlank(message = "Room type is required")
    @Size(max = 50, message = "Room type cannot exceed 50 characters")
    private String roomType;

    @NotNull(message = "number of beds is required")
    private Integer beds;

    @NotNull(message = "Room price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Room price must be greater than zero")
    private BigDecimal roomPrice;

    @NotBlank(message = "Room description is required")
    @Size(max = 500, message = "Room description cannot exceed 500 characters")
    private String roomDescription;

    private String roomPhotoUrl;
}
