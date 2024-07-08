package Lazadar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Lazadar.model.UserCredential;

import java.util.List;


public interface UserCredenRepository extends JpaRepository<UserCredential, Long>{

	Optional<UserCredential> findByUsername(String username);
	UserCredential findOneByUsername(String username);
	UserCredential findOneById (Long id);
	UserCredential findByEmail(String email);
	UserCredential findByIphone(String iphone);

}
