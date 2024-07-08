package Lazadar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Lazadar.model.Role;







public interface RoleRepository extends JpaRepository<Role, Long>{

	Role findByName(String name);
	

}
