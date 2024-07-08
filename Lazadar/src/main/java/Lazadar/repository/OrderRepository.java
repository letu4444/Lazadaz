package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Orderline;

import java.util.List;


@Transactional
public interface OrderRepository extends JpaRepository<Orderline, Long> {

	Orderline findByOrderNumber(String orderNumber);
	@Query(value = "SELECT * FROM ordersanpham u where u.user_id=?1",nativeQuery = true)
	List<Orderline> findByUserid(Long userid);
	
	@Query(value = " SELECT * FROM ordersanpham WHERE order_number=?1 And user_id=?2 AND shope = "
			+ "(SELECT shope FROM ordersanpham WHERE order_number=?1 And user_id=?2 and id =?3 GROUP BY shope HAVING COUNT(*) >= 1)",nativeQuery = true)
    List<Orderline> findByOrdernumberOfUserid(String orderNumber,Long userid,Long id);
	
	//Đây là câu truy vấn lấy theo userid nhưng khác tên shope
	//Lấy top 3 giá trị đầu tiên 
	// Từ dưới lên ORDER BY id DESC
	//WHERE  rn = 1 chỉ lấy ra những dòng có số thứ tự rn bằng 1 tạo 1 bảng ảo để xét
	//bảng tạm thời ProductsWithRowNumber
	 //rn là số thứ tự được tạo ra bởi hàm ROW_NUMBER()
	//ROW_NUMBER() sẽ gán một số thứ tự cho mỗi sản phẩm dựa trên tên sản phẩm
	//ORDER BY (SELECT NULL) chỉ là một cách để không sắp xếp kết quả theo một trường cụ thể nào cả
	@Modifying
	@Query(value = "SELECT top 3 id,order_number,ngaydat FROM ( SELECT id,order_number,ngaydat, ROW_NUMBER() OVER (PARTITION BY shope ORDER BY (SELECT NULL)) AS rn"
		    + " FROM ordersanpham where user_id=?1 ) AS ProductsWithRowNumber WHERE  rn = 1 ORDER BY id DESC",nativeQuery = true)
	String[][] listOrderNumber(Long userid);
	
	void deleteByOrderNumber(String orderNumber);
	
	
}
