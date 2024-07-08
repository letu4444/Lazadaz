package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Inventory;

import java.util.List;


@Transactional
public interface InventoryRepository extends JpaRepository<Inventory, Long>{

	 @Query(value = "SELECT * FROM inventory u where u.products_id=?1",nativeQuery = true)
	Inventory findOneByProducts(Long id);
	 @Query(value = "DELETE FROM inventory u where u.products_id=?1",nativeQuery = true)
	 void deleteByProduct(Long idproduct);
	
 
}
