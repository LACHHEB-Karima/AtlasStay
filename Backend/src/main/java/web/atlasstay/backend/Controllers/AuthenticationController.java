package web.atlasstay.backend.Controllers;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.atlasstay.backend.Dtos.AuthenticationDto;
import web.atlasstay.backend.Dtos.RegistrationDto;
import web.atlasstay.backend.Services.Implementations.AuthenticationService;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationDto request
    ) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }
    @PostMapping("/authenticate")
    public void authenticate(@RequestBody AuthenticationDto request, HttpServletResponse response) {
        authenticationService.authenticateAndSetCookie(request.getEmail(), request.getPassword(), response);
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activateAccount(token);
    }

   //Logout
   @PostMapping("/logout")
   public ResponseEntity<?> logout(HttpServletResponse response) {
       String expiredCookie = "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax";
       response.setHeader("Set-Cookie", expiredCookie);
       return ResponseEntity.ok().build();
   }

}
