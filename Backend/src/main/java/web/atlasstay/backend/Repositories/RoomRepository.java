package web.atlasstay.backend.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.atlasstay.backend.Entities.Room;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query("""
        SELECT r FROM Room r
        WHERE r.roomType = :roomType
        AND NOT EXISTS (
            SELECT 1 FROM Booking b
            WHERE b.room.id = r.id
            AND (:checkInDate < b.checkOutDate AND :checkOutDate > b.checkInDate)
        )
    """)
    Page<Room> findAvailableRoomsByDatesAndTypes(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("roomType") String roomType,
            Pageable pageable
    );

    @Query("""
        SELECT r FROM Room r
        LEFT JOIN Booking b ON b.room.id = r.id
        WHERE b.id IS NULL
    """)
    Page<Room> getAllAvailableRooms(Pageable pageable);

    @Query("""
    SELECT r FROM Room r
    WHERE r.id NOT IN (
        SELECT b.room.id FROM Booking b
        WHERE b.checkInDate <= :endOfWeek AND b.checkOutDate >= :today
    )
""")
    Page<Room> findAvailableThisWeek(@Param("today") LocalDate today,
                                     @Param("endOfWeek") LocalDate endOfWeek,
                                     Pageable pageable);

}
