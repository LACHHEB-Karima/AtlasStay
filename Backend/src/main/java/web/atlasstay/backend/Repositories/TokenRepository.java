package web.atlasstay.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.atlasstay.backend.Entities.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);
}
