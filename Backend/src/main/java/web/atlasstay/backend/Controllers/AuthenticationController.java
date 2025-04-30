package web.atlasstay.backend.Controllers;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.atlasstay.backend.Dtos.AuthenticationDto;
import web.atlasstay.backend.Dtos.AuthenticationResponseDto;
import web.atlasstay.backend.Dtos.RegistrationDto;
import web.atlasstay.backend.Services.Implementations.AuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationservice;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationDto request
    ) throws MessagingException {
        authenticationservice.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationDto request
    ) {
        return ResponseEntity.ok(authenticationservice.authenticate(request));
    }
    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationservice.activateAccount(token);
    }

}
