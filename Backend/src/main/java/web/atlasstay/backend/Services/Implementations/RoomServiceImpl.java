package web.atlasstay.backend.Services.Implementations;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import web.atlasstay.backend.Claudinary.CloudinaryService;
import web.atlasstay.backend.Exceptions.RoomNotFoundException;
import web.atlasstay.backend.Mappers.RoomMapper;
import web.atlasstay.backend.Services.Interfaces.RoomService;
import web.atlasstay.backend.Entities.Room;
import web.atlasstay.backend.Dtos.RoomDTO;
import web.atlasstay.backend.Repositories.RoomRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final CloudinaryService cloudinaryService;

        @Override
        public Long addNewRoom(String roomTitle, String roomType,int beds, BigDecimal roomPrice, String roomDescription, MultipartFile image) {
            try {
                if (image == null || image.isEmpty()) {
                    throw new IllegalArgumentException("Image is required");
                }

                // Upload image to Cloudinary and get the URL
                String photoUrl = cloudinaryService.uploadFile(image, "folder_1");
                if (photoUrl == null || photoUrl.isEmpty()) {
                    throw new RuntimeException("Image upload failed");
                }

                // Create a new Room entity and set values
                Room newRoom = new Room();
                newRoom.setRoomTitle(roomTitle);
                newRoom.setRoomType(roomType);
                newRoom.setBeds(beds);
                newRoom.setRoomPrice(roomPrice);
                newRoom.setRoomDescription(roomDescription);
                newRoom.setRoomPhotoUrl(photoUrl); // Set the uploaded image URL

                // Save the Room to the database
                roomRepository.save(newRoom);

                return newRoom.getId();
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to add new room: " + e.getMessage());
            }
        }


    // Get room details by ID
    @Override
    public RoomDTO getRoomById(Long roomId) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isPresent()) {
            return roomMapper.toRoomDTO(roomOpt.get());
        } else {
            throw new RoomNotFoundException("Room not found");
        }
    }

    // Get all distinct room types
    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Page<RoomDTO> getAllRooms(Pageable pageable) {
        return roomRepository.findAll(pageable).map(roomMapper::toRoomDTO);
    }

    @Override
    public Page<RoomDTO> getAllAvailableRooms(Pageable pageable) {
        return roomRepository.getAllAvailableRooms(pageable).map(roomMapper::toRoomDTO);
    }

    @Override
    public Page<RoomDTO> getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType, Pageable pageable) {
        return roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate, roomType, pageable).map(roomMapper::toRoomDTO);
    }

    // Delete a room by ID
    @Override
    public void deleteRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    // Update room details
    @Override
    public void updateRoom(Long roomId, MultipartFile photo,String roomTitle, String roomType, int beds, BigDecimal roomPrice, String roomDescription) {
        try {
            Room existingRoom = roomRepository.findById(roomId)
                    .orElseThrow(() -> new RoomNotFoundException("Room with ID " + roomId + " not found"));

            // Update room properties from request parameters
            existingRoom.setRoomTitle(roomTitle);
            existingRoom.setRoomType(roomType);
            existingRoom.setBeds(beds);
            existingRoom.setRoomPrice(roomPrice);
            existingRoom.setRoomDescription(roomDescription);

            // Upload new image only if provided
            if (photo != null && !photo.isEmpty()) {
                String photoUrl = cloudinaryService.uploadFile(photo, "folder_1");
                if (photoUrl == null) {
                    throw new RuntimeException("Image upload failed");
                }
                existingRoom.setRoomPhotoUrl(photoUrl);
            }

            roomRepository.save(existingRoom);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update room: " + e.getMessage());
        }
    }

    public String uploadRoomImage(MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        return cloudinaryService.uploadFile(image, "rooms");
    }

    public Page<RoomDTO> getAvailableThisWeek(Pageable pageable) {
        LocalDate today = LocalDate.now();
        LocalDate endOfWeek = today.plusDays(6);

        return roomRepository.findAvailableThisWeek(today, endOfWeek, pageable)
                .map(roomMapper::toRoomDTO);
    }

}
