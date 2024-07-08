package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import Lazadar.model.Imagephu;
import jakarta.transaction.Transactional;

import java.util.List;


@Transactional
public interface ImagephuRepository extends JpaRepository<Imagephu, Long>{
	@Query(value = "SELECT image FROM imagephu u where u.product_id=?1",nativeQuery = true)
	String[] findByProducts(Long productsid);
	
	@Query(value = "DELETE FROM imagephu u where u.product_id=?1",nativeQuery = true)
	void deleteByProduct(Long idproduct);

}
