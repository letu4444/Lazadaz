package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import Lazadar.model.Phanloai1;
import jakarta.transaction.Transactional;

import java.util.List;


@Transactional
public interface Phanloai1Repository extends JpaRepository<Phanloai1, Long> {

	@Query(value = "SELECT tenphanloai,image FROM phanloaiA u where u.product_id=?1",nativeQuery = true)
	String[][] findByProducts(Long productsid);
	@Query(value = "DELETE FROM phanloaiA u where u.product_id=?1",nativeQuery = true)
	void deleteByProduct(Long id);
}
