package web.atlasstay.backend.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import web.atlasstay.backend.Dtos.RoomDTO;
import web.atlasstay.backend.Services.Interfaces.RoomService;
import web.atlasstay.backend.Exceptions.RoomNotFoundException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/public/rooms")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RoomController {

    private final RoomService roomService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadRoomImage(@RequestParam("image") MultipartFile image) {
        String imageUrl = roomService.uploadRoomImage(image);
        return ResponseEntity.ok("Image uploaded successfully: " + imageUrl);
    }

    // Add a new room
    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> addNewRoom(
            @RequestParam("roomTitle") String roomTitle,
            @RequestParam("roomType") String roomType,
            @RequestParam("beds") Integer beds,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("roomDescription") String roomDescription,
            @RequestParam("image") MultipartFile image) {

        Long roomId = roomService.addNewRoom(roomTitle, roomType, beds, roomPrice,roomDescription, image);
        return ResponseEntity.ok(roomId);
    }

    // Get all distinct room types
    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllRoomTypes() {
        List<String> roomTypes = roomService.getAllRoomTypes();
        return new ResponseEntity<>(roomTypes, HttpStatus.OK);
    }

    // Get all rooms
    @GetMapping
    public ResponseEntity<Page<RoomDTO>> getAllRooms(Pageable pageable) {
        return ResponseEntity.ok(roomService.getAllRooms(pageable));
    }

    // Get a room by ID
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long roomId) {
        try {
            RoomDTO roomDTO = roomService.getRoomById(roomId);
            return new ResponseEntity<>(roomDTO, HttpStatus.OK);
        } catch (RoomNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Get available rooms by date and type
    @Operation(summary = "Get available rooms by date and type")
    @GetMapping("/available")
    public ResponseEntity<Page<RoomDTO>> getAvailableRoomsByDateAndType(
            @Parameter(description = "Check-in date", example = "2025-03-01")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,

            @Parameter(description = "Check-out date", example = "2025-03-10")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,

            @Parameter(description = "Room type", example = "Deluxe")
            @RequestParam String roomType,

            Pageable pageable) {
        return ResponseEntity.ok(roomService.getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType, pageable));
    }

    // Get all available rooms
    @GetMapping("/available/")
    public ResponseEntity<Page<RoomDTO>> getAllAvailableRooms(Pageable pageable) {
        return ResponseEntity.ok(roomService.getAllAvailableRooms(pageable));
    }

    // Update room details
    @PutMapping(value = "/{roomId}", consumes = "multipart/form-data")
    public ResponseEntity<String> updateRoom(
            @PathVariable Long roomId,
            @RequestParam("photo") MultipartFile photo,// for the image file
             @RequestParam("roomTitle") String roomTitle,
            @RequestParam("roomType") String roomType,       // roomType field as request
            @RequestParam("beds") Integer beds,
            @RequestParam("roomPrice") BigDecimal roomPrice,     // roomPrice field as request param
            @RequestParam("roomDescription") String roomDescription) {   // roomDescription field as request param

        // Pass the request params and the file to the service
        roomService.updateRoom(roomId, photo, roomTitle, roomType,beds, roomPrice, roomDescription);

        return new ResponseEntity<>("Room updated successfully", HttpStatus.OK);
    }

    //Rooms available in the current week
    @GetMapping("/available/all")
    public ResponseEntity<Page<RoomDTO>> getAvailableRoomsThisWeek(Pageable pageable) {
        Page<RoomDTO> rooms = roomService.getAvailableThisWeek(pageable);
        return ResponseEntity.ok(rooms);
    }

    // Delete a room by ID
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }

}

