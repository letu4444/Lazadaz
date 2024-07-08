package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProductsDto extends AbcsChung<ProductsDto>{

	private Long id;
	private String name;
	private String description;
	private Integer sl;
	private String image;
	private String phanloai;
	private String shope;
	private String sotien;
	private String saletien;
	private String[] imagephu;
	private String[] nhomphanloai;
	private String[][] phanloai1;
	private String[][] phanloai2;
	
}
