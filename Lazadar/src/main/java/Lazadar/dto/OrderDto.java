package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto extends AbcsChung<OrderDto>{

	private Long id;
	private Long userId;
	private String orderNumber;
	private String sotien;
	private String shipe;
	private String image;
	private String phanloai;
	private Integer sl;
	private String shope;
	private String name;
	private String trangthai;
	private Long idsp;
	
	private String ngaydat;
	
	
}
