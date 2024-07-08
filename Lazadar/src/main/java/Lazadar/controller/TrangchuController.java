package Lazadar.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import Lazadar.dto.ProductsDto;
import Lazadar.model.Products;
import Lazadar.model.UserCredential;
import Lazadar.repository.ImagephuRepository;
import Lazadar.repository.Phanloai1Repository;
import Lazadar.repository.Phanloai2Repository;
import Lazadar.services.AddresService;
import Lazadar.services.CatService;
import Lazadar.services.CustomUserDetailsService;
import Lazadar.services.OrderService;
import Lazadar.services.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;


@Controller
@RequestMapping
@Slf4j
public class TrangchuController {

	@Autowired
	private CustomUserDetailsService authService;

	@Autowired
	private CatService catService;

	@Autowired
	private ProductService productService;
	
	@Autowired
	private ImagephuRepository imagephuRepository;
	
	@Autowired
	private Phanloai2Repository phanloai2Repository;
	
	@Autowired
	private Phanloai1Repository phanloai1Repository;
	
	@Autowired
	private AddresService addresService;

//	@Autowired
//	private WebconfigClient webconfigClient;
	@Autowired
	private OrderService orderService;

	private final UserCredential credentia = new UserCredential();

	@GetMapping("/trangchu")
	public String Register(HttpServletRequest request) {

		return "trangchu";
	}

	@GetMapping("/trangchu/noidung")
	public String noidungPage() {
		return "noidung";
	}

	@GetMapping("/trangchu/tag")
	public String tagPage( Model model,@RequestParam("p") String key, @RequestParam(value = "lits", required = false) Integer p) {
		if(p == null) {
			p =0;
		}
		Pageable pageable = PageRequest.of(p, 5);
		String keyword = "["+key+"]%";
		Page<Products> page = productService.SearchName(keyword, pageable);
		List<ProductsDto> dtos = new ArrayList<>();
		for (Products pro : page) {
			ProductsDto dto = ProductsDto.builder()
					.id(pro.getId())
					.description(pro.getDescription())
					.image(pro.getImage())
					.name(pro.getName())
					.phanloai(pro.getPhanloai())
					.saletien(pro.getSaletien())
					.shope(pro.getShope())
					.sl(pro.getInventory().getQuantity())
					.sotien(pro.getSotien())
					.imagephu(imagephuRepository.findByProducts(pro.getId()))
					.phanloai1(phanloai1Repository.findByProducts(pro.getId()))
					.phanloai2(phanloai2Repository.findByProducts(pro.getId()))

					.build();
			dtos.add(dto);
		}
		model.addAttribute("list", dtos);
		return "tag";
	}

	@GetMapping("/member.user")
	@PreAuthorize("hasRole('ROLE_USER')")
	public String userPage() {
		return "user";
	}
    
	@GetMapping("/cart")
	public String cartPage(Model model) {

	
		return "giohang";
	}

	@GetMapping("/trangchu/products/{id}")
	public String productsPage(Model model, @PathVariable String id) {

		String[] id1 = id.split("-");
		String[] iad = Arrays.copyOfRange(id1, id1.length - 2, id1.length);
		String[] idproduct = iad[0].split("i");
//		 String[] idusername =iad[1].split("s");
		Long idproduct1 = Long.parseLong(idproduct[1]);
//		 Long iduser = Long.parseLong(idusername[1]);
		ProductsDto dto = productService.IdProduct(idproduct1);
		model.addAttribute("product", dto);
		return "cat";
	}

	@GetMapping("/checkout")
	@PreAuthorize("hasRole('ROLE_USER')")
	public String checkoutPage(Model model,@RequestParam(value = "idsp",required = false) String idsp) {
//      CustomUserDetails userid = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication();
		if(idsp!= null) {
			model.addAttribute("listorder", idsp);
		}

		return "checkout";
	}
	
	
	//Lấy thông tin đơn hàng
	@GetMapping("/order/views")
	@PreAuthorize("hasRole('ROLE_USER')")
	public String OrderPage() {
		return "donmua";
	}
	@GetMapping("/member.user/addres")
	@PreAuthorize("hasRole('ROLE_USER')")
	public String AdddresPage() {
		return "addres";
	}

}
