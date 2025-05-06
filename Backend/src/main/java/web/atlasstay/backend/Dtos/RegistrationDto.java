package web.atlasstay.backend.Dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import web.atlasstay.backend.Entities.Role;

@Getter
@Setter
@Builder
public class RegistrationDto {


    @NotEmpty(message = "Full name is mandatory")
    @NotNull(message = "Full name is mandatory")
    private String name;
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;
    @NotNull(message = "role must be specified")
    private Role role;
}