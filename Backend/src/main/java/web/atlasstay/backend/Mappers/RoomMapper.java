package web.atlasstay.backend.Mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.atlasstay.backend.Dtos.RoomDTO;
import web.atlasstay.backend.Entities.Room;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomMapper {

    private final ModelMapper modelMapper;

    public RoomMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    // Convert Room entity to RoomDTO
    public RoomDTO toRoomDTO(Room room) {
        if (room == null) return null;
        return modelMapper.map(room, RoomDTO.class);
    }

    // Convert RoomDTO to Room entity
    public Room toRoom(RoomDTO roomDTO) {
        if (roomDTO == null) return null;
        return modelMapper.map(roomDTO, Room.class);
    }

    public List<RoomDTO> toRoomDTOList(List<Room> rooms) {
        if (rooms == null || rooms.isEmpty()) return List.of();
        return rooms.stream()
                .map(this::toRoomDTO)
                .collect(Collectors.toList());
    }

}
