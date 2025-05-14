package web.atlasstay.backend.Mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Dtos.RoomDTO;
import web.atlasstay.backend.Entities.Booking;
import web.atlasstay.backend.Entities.Room;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingMapper {

    private final ModelMapper modelMapper;
    private final RoomMapper roomMapper;

    public BookingMapper(ModelMapper modelMapper, RoomMapper roomMapper) {
        this.modelMapper = modelMapper;
        this.roomMapper = roomMapper;

        // Optional: Customize the mapping if needed
        modelMapper.typeMap(Booking.class, BookingDTO.class).addMappings(mapper -> {
            mapper.skip(BookingDTO::setRoom); // handled manually
        });
    }

    public BookingDTO toBookingDTO(Booking booking) {
        if (booking == null) return null;

        BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);

        Room room = booking.getRoom();
        if (room != null) {
            RoomDTO roomDTO = roomMapper.toRoomDTO(room);
            bookingDTO.setRoom(roomDTO);
        }

        return bookingDTO;
    }

    public Booking toBooking(BookingDTO bookingDTO) {
        if (bookingDTO == null) return null;

        Booking booking = modelMapper.map(bookingDTO, Booking.class);

        RoomDTO roomDTO = bookingDTO.getRoom();
        if (roomDTO != null) {
            Room room = roomMapper.toRoom(roomDTO);
            booking.setRoom(room);
        }

        return booking;
    }

    public List<BookingDTO> toBookingDTOList(List<Booking> bookings) {
        return bookings.stream()
                .map(this::toBookingDTO)
                .collect(Collectors.toList());
    }

    public List<Booking> toBookingList(List<BookingDTO> bookingDTOs) {
        return bookingDTOs.stream()
                .map(this::toBooking)
                .collect(Collectors.toList());
    }
}
