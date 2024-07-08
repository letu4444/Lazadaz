package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import Lazadar.model.Nhomphanloai;
import jakarta.transaction.Transactional;


@Transactional
public interface NhomphanloaiRepository extends JpaRepository<Nhomphanloai, Long>{
	@Query(value = "SELECT nhomphanloai FROM nhomphanloai u where u.product_id=?1",nativeQuery = true)
	String[] findByNhomphanloai(Long id);
	
	@Query(value = "DELETE FROM nhomphanloai u where u.product_id=?1",nativeQuery = true)
	void deleteByProduct(Long id);

}
