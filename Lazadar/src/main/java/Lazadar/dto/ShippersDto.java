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

public class ShippersDto {

	private Long id;
	private String tenshippers;
	private String orderNumber;
	private String trangthai;
	
}
