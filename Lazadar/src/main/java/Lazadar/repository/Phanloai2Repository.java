package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import Lazadar.model.Phanloai2;
import jakarta.transaction.Transactional;

import java.util.List;


@Transactional
public interface Phanloai2Repository extends JpaRepository<Phanloai2, Long>{
  
	@Query(value = "SELECT tenphanloai,giatien FROM phanloaiB u where u.product_id=?1",nativeQuery = true)
	String[][] findByProducts(Long productsid);
	@Query(value = "DELETE FROM phanloaiB u where u.product_id=?1",nativeQuery = true)
	void deleteByProduct(Long idproduct);
}
