package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Phanloai2Dto {

	private Long id;
	 private String tenphanloai;
	 private String giatien;
	 private Long productId;
}
