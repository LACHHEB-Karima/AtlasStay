package web.atlasstay.backend.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rooms")
@EntityListeners(AuditingEntityListener.class)
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @NotNull(message = "Currency is required")
    @Enumerated(EnumType.STRING)
    private Currency currency = Currency.MAD;

    @NotBlank(message = "Room photo URL is required")
    @Size(max = 255, message = "Room photo URL cannot exceed 255 characters")
    private String roomPhotoUrl;

    @NotBlank(message = "Room description is required")
    @Size(max = 500, message = "Room description cannot exceed 500 characters")
    private String roomDescription;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", currency=" + currency +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", roomDescription='" + roomDescription + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
