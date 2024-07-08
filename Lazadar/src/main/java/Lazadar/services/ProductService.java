package Lazadar.services;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import Lazadar.dto.ProductsDto;
import Lazadar.model.Imagephu;
import Lazadar.model.Inventory;
import Lazadar.model.Nhomphanloai;
import Lazadar.model.Phanloai1;
import Lazadar.model.Phanloai2;
import Lazadar.model.Products;
import Lazadar.repository.ImagephuRepository;
import Lazadar.repository.InventoryRepository;
import Lazadar.repository.NhomphanloaiRepository;
import Lazadar.repository.Phanloai1Repository;
import Lazadar.repository.Phanloai2Repository;
import Lazadar.repository.ProductsRepository;
import Lazadar.repository.UserCredenRepository;



@Service
public class ProductService {

	@Autowired
	private ProductsRepository productsRepository;

	@Autowired
	private InventoryRepository inventoryRepository;

	@Autowired
	private ImagephuRepository imagephuRepository;

	@Autowired
	private Phanloai1Repository phanloai1Repository;

	@Autowired
	private Phanloai2Repository phanloai2Repository;

	@Autowired
	private UserCredenRepository credenRepository;
	
	@Autowired
	private NhomphanloaiRepository nhomphanloaiRepository;

	// Lưu sản phẩm
	public void saveProduct(List<ProductsDto> dto1) {
		
		for (ProductsDto dto : dto1) {
			Products products = Products.builder()
					          .name(dto.getName())
					          .image(dto.getImage())
					          .phanloai(dto.getPhanloai())
					          .saletien(dto.getSaletien())
					          .shope(dto.getShope())
					          .sotien(dto.getSotien())
					          .description(dto.getDescription())

					.build();
			if (dto.getId() != null) {
				products.setId(dto.getId());
			}
			products = productsRepository.save(products);
			Inventory inventory = Inventory.builder()
					             .products(products)
					             .quantity(dto.getSl())
					             .soluongdaban(0).build();
			inventoryRepository.save(inventory);
			try {
				for (String image : dto.getImagephu()) {
					Imagephu imagephu = new Imagephu();
					imagephu.setImage(image);
					imagephu.setProducts(products);
					imagephuRepository.save(imagephu);
				}
				for (String nhomphanloai : dto.getNhomphanloai()) {
					Nhomphanloai nhomphanloai2 =Nhomphanloai.builder()
							      .nhomphanloai(nhomphanloai)
							      .products(products)
							      .build();
					nhomphanloaiRepository.save(nhomphanloai2);
				}
				for (String[] phanloai1 : dto.getPhanloai1()) {
					Phanloai1 phanloai1s = new Phanloai1();
					phanloai1s.setImage(phanloai1[1]);
					phanloai1s.setTenphanloai(phanloai1[0]);
					phanloai1s.setProducts(products);
					phanloai1Repository.save(phanloai1s);
				}
				for (String[] phanloai1 : dto.getPhanloai2()) {
					Phanloai2 phanloai1s = new Phanloai2();
					phanloai1s.setGiatien(phanloai1[1]);
					phanloai1s.setTenphanloai(phanloai1[0]);
					phanloai1s.setProducts(products);
					phanloai2Repository.save(phanloai1s);
				}
			} catch (Exception e) {
				
				
				imagephuRepository.deleteByProduct(products.getId());
				phanloai1Repository.deleteByProduct(products.getId());
				phanloai2Repository.deleteByProduct(products.getId());
				nhomphanloaiRepository.deleteByProduct(products.getId());
				inventoryRepository.deleteByProduct(products.getId());
				productsRepository.deleteByProduct(products.getId());
			}
		}

//		return dto;
	}

	// Tìm sản phẩm theo tên
	public Page<Products> SearchName(String keyword, Pageable pageable) {
		return productsRepository.findByKeyword(keyword, pageable);
	}

	// Lấy sản phẩm theo id
	public ProductsDto IdProduct(Long id) {
		Products products = productsRepository.findOneById(id);
		ProductsDto dto = ProductsDto.builder()
				.id(id)
				.description(products.getDescription())
				.image(products.getImage())
				.name(products.getName())
				.phanloai(products.getPhanloai())
				.saletien(products.getSaletien())
				.shope(products.getShope())
				.sl(inventoryRepository.findOneByProducts(id).getQuantity())
				.sotien(products.getSotien())
				.imagephu(imagephuRepository.findByProducts(id))
				.phanloai1(phanloai1Repository.findByProducts(id))
				.phanloai2(phanloai2Repository.findByProducts(id))
                .nhomphanloai(nhomphanloaiRepository.findByNhomphanloai(id))
				.build();
		return dto;
	}

	// Tìm danh sách sản phẩm
	public List<String> ListName(String kyeword) {
		return productsRepository.findBySearch(kyeword);
	}

	public void save(List<ProductsDto> dto) {
		// TODO Auto-generated method stub
		
	}
}
