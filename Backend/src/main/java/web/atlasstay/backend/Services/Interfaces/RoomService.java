package web.atlasstay.backend.Services.Interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import web.atlasstay.backend.Dtos.RoomDTO;
import web.atlasstay.backend.Entities.Room;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


public interface RoomService {

    Long addNewRoom(String roomTitle, String roomType, int beds, BigDecimal roomPrice, String roomDescription, MultipartFile image);

    List<String> getAllRoomTypes();

    void deleteRoom(Long roomId);

    void updateRoom(Long roomId, MultipartFile photo,String roomTitle, String roomType,int beds, BigDecimal roomPrice, String roomDescription);

    RoomDTO getRoomById(Long roomId);

    Page<RoomDTO> getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType, Pageable pageable);

    Page<RoomDTO> getAllAvailableRooms(Pageable pageable);

    Page<RoomDTO> getAllRooms(Pageable pageable);

    String uploadRoomImage(MultipartFile image);
    Page<RoomDTO> getAvailableThisWeek(Pageable pageable);
}
