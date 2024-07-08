package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Address;

import java.util.List;



@Transactional
public interface AddressRepository extends JpaRepository<Address, Long> {
   @Query(value = "SELECT * FROM address u where u.user_id=?1",nativeQuery = true)
	Address findByUserId(Long user);
}
