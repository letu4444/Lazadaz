package Lazadar.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import Lazadar.dto.CatDto;
import Lazadar.dto.InventoryDto;
import Lazadar.model.Cat;
import Lazadar.repository.CatRepository;
import Lazadar.repository.ProductsRepository;
import Lazadar.repository.UserCredenRepository;



@Service
public class CatService {

	@Autowired
	private CatRepository catRoepository;
	
	@Autowired
	private ProductsRepository productsRepository;
	
	@Autowired
	private UserCredenRepository credenRepository;
	
	@Autowired
	private InventoryService inventoryService;
	
	@Autowired
	private OrderService checkoutService;
	
	
	//lưu order sản phẩm
	
	public void Catsave(CatDto dto) {
//		Random random = new Random();
//        long randomNumber = Math.abs(random.nextLong() % 100000000000000L);
		Cat cat = Cat.builder()
				             .image(dto.getImage())
				             .name(dto.getName())
				             .shope(dto.getShope())
				             .phanloai(dto.getPhanloai())
				             .soluong(dto.getSl())
				             .sotien(dto.getSotien())
				             .products(productsRepository.findOneById(dto.getProductid()))
				             .userId(credenRepository.findOneById(dto.getUserid()))
				             .build();
		//kiểm tra xem cùng tên cùng phân loại không để cập nhật số lượng thôi
		String phanloai = dto.getPhanloai();
		String name = dto.getName();
		Cat test = catRoepository.findByPhanLoaiandName(name,phanloai);
		
		if(test != null) {
			cat.setId(test.getId());
			cat.setSoluong(dto.getSl() + test.getSoluong());
		}
		//CheckOut để thanh toán tiền 
//		checkoutDto checkoutdto = checkoutDto.builder()
//				                  .image(orderline.getImage())
//				                  .name(orderline.getName())
//				                  .orderNumber(orderline.getOrderNumber())
//				                  .phanloai(orderline.getPhanloai())
//				                  .userId(dto.getUserid())
//				                  .shope(orderline.getShope())
//				                  .sl(orderline.getSoluong())
//				                  .sotien(orderline.getSotien())
//				                  .trangthai("uppayments").build();
		//Nơi kiểu tra xem inventory còn hàng hay không để báo cbo khách hàng biết
		// Để làm được điều đó thì cần phải thêm webfux vào đêr nhận được kết nổi giữa 2 server khác nhau
		//Sẽ gọi hàm url đó ra
		//Do vậu k dùng   Boolean nữa mà thêm vào đó là class invenrtory ơt bên order
		InventoryDto inventoryDto = inventoryService.isInStock(dto.getProductid());
		if(inventoryDto.isInStock()) {
			if(inventoryDto.getQuantity()>= cat.getSoluong()) {
				catRoepository.save(cat);
//				checkoutService.CheckoutSave(checkoutdto);
				
			}
			
		}else {
			throw new IllegalArgumentException("Đã hết hàng");
		}
	}
	
	//Lấy sanpham giỏ hàng theo userid
	public List<CatDto> CatUserPage(Long userid){
		List<Cat> list = catRoepository.findByUserId(userid);
		List<CatDto> dtos = new ArrayList<>();
		for (Cat cat : list) {
			CatDto dto = CatDto.builder()
					          .id(cat.getId())
					          .image(cat.getImage())
					          .name(cat.getName())
					          .phanloai(cat.getPhanloai())
					          .productid(cat.getProducts().getId())
					          .shope(cat.getShope())
					          .sl(cat.getSoluong())
					          .sotien(cat.getSotien())
					          .userid(userid)
					          .build();
			dtos.add(dto);
		}
		return dtos;
	}
	//Lấy sản phẩm theo id để hiển thị ra giỏ hoặc chechout
	public CatDto CatIdPage(Long id) {
		Cat cat = catRoepository.findOneById(id);
		CatDto catDto = CatDto.builder().id(cat.getId())
				       .image(cat.getImage())
				       .name(cat.getName())
				       .phanloai(cat.getPhanloai())
				       .productid(cat.getProducts().getId())
				       .shope(cat.getShope())
				       .sl(cat.getSoluong())
				       .sotien(cat.getSotien())
				       .userid(cat.getUserId().getId())
				       
				       .build();
		return catDto;
	}
	
	
	//Lấy số lượng sản phẩm để hiển thị giỏ hàng
//	public List<Integer> OrderSoluong(Long userid){
//	
//		return ordersRoepository.findBySoluong(userid);
//	}
	//Update số lượng 
	public void update(Integer sl, Long id) {
		catRoepository.updateSl(sl, id);
	}
	
	//Xóa đơn hàng đi
	public void delete(Long id) {
		catRoepository.deleteById(id);
		
	}
	
	
}
