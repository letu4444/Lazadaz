package Lazadar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Products;



@Transactional
public interface ProductsRepository extends JpaRepository<Products, Long>{
	 @Query(value = "SELECT * FROM products u where u.name LIKE ?1",nativeQuery = true)
	Page<Products> findByKeyword(String keyword,Pageable pageable);
	 @Query(value = "SELECT DISTINCT name FROM products u where u.name LIKE ?1",nativeQuery = true)
     List<String> findBySearch(String keyword);
	 Products findOneById(Long id);
	 @Query(value = "DELETE FROM inventory u where u.id=?1",nativeQuery = true)
	 void deleteByProduct(Long id);
}
