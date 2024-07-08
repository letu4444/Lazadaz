package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CatDto {

	private Long id;
	private String image;
	private String phanloai;
	private Integer sl;
	private String shope;
	private String sotien;
	private String name;
	private Long userid;
	private Long productid;
	
	
	
}
