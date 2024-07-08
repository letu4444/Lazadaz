package Lazadar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Lazadar.dto.InventoryDto;
import Lazadar.model.Inventory;
import Lazadar.repository.InventoryRepository;
import Lazadar.repository.ProductsRepository;



@Service
public class InventoryService {

	@Autowired
	private InventoryRepository inventoryRepository;
	
	@Autowired
	private ProductsRepository productsRepository;
	
	//Kiểm tra xem còn đủ số lượng không để lưu vào
	public InventoryDto isInStock(Long id){
		Inventory inventory = inventoryRepository.findOneByProducts(id);
		InventoryDto dto = InventoryDto.builder()
				            .quantity(inventory.getQuantity())
				            .productid(inventory.getProducts().getId())
				            .soluongdaban(inventory.getSoluongdaban())
				            .isInStock((inventory.getQuantity()) >0)
				            .build();
		return dto;
	}
	
	//Lưu vào
	public void createInventory(InventoryDto dto) {
		Long id = Long.valueOf(dto.getProductid());
		Inventory inventory = Inventory.builder()
				          .quantity(dto.getQuantity())
				          .soluongdaban(dto.getSoluongdaban())
				          .products(productsRepository.findOneById(id))
				          .build();
		inventoryRepository.save(inventory);
		}
	
}
