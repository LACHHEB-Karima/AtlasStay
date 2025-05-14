package web.atlasstay.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.atlasstay.backend.Entities.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
