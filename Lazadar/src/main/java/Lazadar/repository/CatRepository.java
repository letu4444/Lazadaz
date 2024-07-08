package Lazadar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Cat;






@Transactional
public interface CatRepository extends JpaRepository<Cat, Long>{
 
	@Query(value = "SELECT * FROM cat u where u.user_id=?1",nativeQuery = true)
	List<Cat> findByUserId(Long userId);
	
	Cat findOneById(Long id);
	//Lấy xem phân loại đó có trong sql chưa
//	@Modifying
//	@Query(value = "SELECT * FROM cat u where u.name like N?1 and u.phanloai LIKE N?2",nativeQuery = true)
//	Cat findByPhanloaiandName(String name, String phanloai); 
	/*
	 * @Query(value =
	 * "SELECT soluong FROM ordersanpham u where u.user_id=?1",nativeQuery = true)
//	 * List<Integer> findBySoluong(Long userId);
	 */
//	@Query(value = "DELETE FROM ordersanpham where order_number=?1",nativeQuery = true)
//	void deleteOrder(String orderNumber);
	@Modifying
	@Query(value = "UPDATE cat SET soluong = ?1 WHERE id = ?2",nativeQuery = true)
	void updateSl(Integer sl,Long id);
	
	void deleteById(Long id);
}
