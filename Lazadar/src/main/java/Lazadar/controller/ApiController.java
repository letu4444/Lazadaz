package Lazadar.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.nimbusds.jose.shaded.gson.Gson;

import Lazadar.dto.AddressDto;
import Lazadar.dto.CatDto;
import Lazadar.dto.OrderDto;
import Lazadar.dto.ProductsDto;
import Lazadar.services.AddresService;
import Lazadar.services.CatService;
import Lazadar.services.OrderService;
import Lazadar.services.ProductService;




@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private CatService catService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private AddresService addresService;
	

	
	@PostMapping("/product")
	public void ProductPage(@RequestBody ProductsDto dto) {
		List<ProductsDto> dtos = dto.getListResul();
		for (ProductsDto productsDto : dtos) {
			System.out.println(productsDto);
		}
		productService.saveProduct(dto.getListResul());
	}
	@PostMapping("/cat/save")

	public void OrderPage(@RequestBody CatDto dto) {
		
		catService.Catsave(dto);
	}
	
	@GetMapping("/cat/userid")
	public List<CatDto> CatUseridPage(@RequestParam("userid") Long userid) {
		return catService.CatUserPage(userid);
	}
	
	@PutMapping("/cat/update")
	
	public void UpdateCat(@RequestParam("sl") Integer sl,@RequestParam("idsp") Long id) {
		catService.update(sl, id);
	}
	
	@DeleteMapping("/cat/delete")
	
	public void DeleteCat(@RequestBody Long[] id) {
		for (Long idsp : id) {
			catService.delete(idsp);
		}
		
	}
	@GetMapping("/search")
	public List<String> SearchPage(@RequestParam(value = "keyword",required = true) String key
			                            ){
//		Pageable pageable = PageRequest.of(p, 5);
//		Page<Products> page = productService.SearchName(key, pageable);
		String keyword = "%"+key+"%"; 
		List<String> string = productService.ListName(keyword);
		List<String> dtos = new ArrayList<>();
		for (String pro : string) {
	
			dtos.add(pro);
		}
		return dtos;
	}
	@PostMapping("/order/save")
	@PreAuthorize("hasRole('ROLE_USER')")
	public void OrderSavePage(@RequestBody OrderDto dto) {
		Random random = new Random();
		long randomNumber = Math.abs(random.nextLong() % 100000000000000L);
		for (OrderDto orderdto : dto.getListResul()) {
			orderdto.setOrderNumber(String.valueOf(randomNumber));
        	orderService.OrderSave(orderdto); 
		}
//		String date = LocalDate.now().getDayOfMonth()+"/"+LocalDate.now().getMonthValue()+"/"+LocalDate.now().getYear()+"-Order "+randomNumber;
		
	}
	//Lấy theo ordernumber
	@GetMapping("/order/views")

	public List<OrderDto> OrderDtoNumberPage(@RequestParam("ordernumber") String orderNumber,@RequestParam("userid") Long userid,@RequestParam("idorder") Long idorder) {
		return orderService.listOrder(orderNumber, userid,idorder);
	}
	//Lấy ra 3 lần order đầu tiên 
	@GetMapping("/order/listuserid")
	
	public String[][] OrderList(@RequestParam("userid") Long userid) {
		return orderService.listCheckoutOrder(userid);
	}
//	@GetMapping("/checkout")
//	public OrderDto OrderPage(String orderNumber) {
//	  return orderService.listOrder(orderNumber);
//	}
	@GetMapping("/checkout/list")
	
//	@ResponseBody
	public List<CatDto> OrderOfOrderNumber(@RequestParam(value = "userid", required = false) Long userid,
			@RequestParam(value = "idsp", required = false) String idsp) {
		List<CatDto> cat = new ArrayList<>();
	
		if (idsp != null) {
			String[] a = idsp.split(",");
			for (String catString : a) {
//				checkoutDtos = checkoutService.listCheckoutOrder(order);
				CatDto dto = catService.CatIdPage(Long.parseLong(catString));
				cat.add(dto);
			}
		} else if (userid != null) {
			cat = catService.CatUserPage(userid);
		}
//		String jsonOrders = new Gson().toJson(clone()) ;
	  return cat;
	}
	@GetMapping("/addres")
	@PreAuthorize("hasRole('ROLE_USER')")
	public AddressDto AddresPage(@RequestParam("id") Long userid) {
		return addresService.UserId(userid);
	}
	
	@PostMapping("/addres/save")
	@PreAuthorize("hasRole('ROLE_USER')")
	public void AddresSavePage(@RequestBody AddressDto addressDto) {
		 addresService.AddressSave(addressDto);
	}
	
	
}
