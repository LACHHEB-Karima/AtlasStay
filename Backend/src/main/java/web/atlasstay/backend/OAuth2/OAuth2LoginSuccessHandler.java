package web.atlasstay.backend.OAuth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import web.atlasstay.backend.Entities.Role;
import web.atlasstay.backend.Entities.User;
import web.atlasstay.backend.Repositories.UserRepository;
import web.atlasstay.backend.Services.Implementations.JwtService;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = token.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        String providerId = oAuth2User.getName();

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setPictureUrl(picture);
                    newUser.setProviderId(providerId);
                    newUser.setRole(Role.USER);
                    newUser.setEnabled(true);
                    newUser.setAccountLocked(false);
                    return userRepository.save(newUser);
                });

        String jwt = jwtService.generateToken(user);
        String cookieValue = String.format(
                "token=%s; Max-Age=%d; Path=/; HttpOnly; SameSite=Lax",
                jwt,
                24 * 60 * 60
        );
        response.setHeader("Set-Cookie", cookieValue);

        // Redirect user to the frontend
        response.sendRedirect("http://localhost:5173");
    }
}


