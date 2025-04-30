package web.atlasstay.backend.Mappers;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import web.atlasstay.backend.Dtos.BookingDTO;
import web.atlasstay.backend.Entities.Booking;

import java.util.List;
import java.util.stream.Collectors;

public class BookingMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

//    static {
//        // Explicitly define custom mappings, if necessary
//        modelMapper.addMappings(new PropertyMap<BookingDTO, Booking>() {
//            @Override
//            protected void configure() {
//                map(source.getBookingConfirmationCode(), destination.getBookingConfirmationCode());
//                map(source.getRoomId(), destination.getRoomId());
//                map(source.getUserId(), destination.getUserId());
//            }
//        });
//    }


    public static BookingDTO toBookingDTO(Booking booking) {
        return modelMapper.map(booking, BookingDTO.class);
    }

    public static Booking toBooking(BookingDTO bookingDTO) {
        return modelMapper.map(bookingDTO, Booking.class);
    }

    public static List<BookingDTO> toBookingDTOList(List<Booking> bookings) {
        return bookings.stream()
                .map(BookingMapper::toBookingDTO)
                .collect(Collectors.toList());
    }
    public static List<Booking> toBookingList(List<BookingDTO> bookingDTOs) {
        return bookingDTOs.stream()
                .map(BookingMapper::toBooking)
                .collect(Collectors.toList());
    }
}
