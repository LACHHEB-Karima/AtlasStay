package web.atlasstay.backend.Mappers;
import org.springframework.stereotype.Service;
import web.atlasstay.backend.Dtos.UserDTO;
import web.atlasstay.backend.Entities.User;

@Service
public class UserMapper {

    public static UserDTO toUserDto(User user) {
        if (user == null) return null;

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .pictureUrl(user.getPictureUrl())
                .role(user.getRole().name())
                .build();
    }

    public static User toUserEntity(UserDTO dto) {
        if (dto == null) return null;

        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .pictureUrl(dto.getPictureUrl())
                .role(Enum.valueOf(web.atlasstay.backend.Entities.Role.class, dto.getRole()))
                .build();
    }
}

