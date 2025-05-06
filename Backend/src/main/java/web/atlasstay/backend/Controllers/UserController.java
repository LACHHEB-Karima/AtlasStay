package web.atlasstay.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import web.atlasstay.backend.Dtos.UserDTO;
import web.atlasstay.backend.Entities.User;
import web.atlasstay.backend.Mappers.UserMapper;
import web.atlasstay.backend.Repositories.UserRepository;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDTO userDTO = userMapper.toUserDto(user);
        return ResponseEntity.ok(userDTO);
    }
}
