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
public class InventoryDto {

	private Integer quantity;
    private Integer soluongdaban;
    private Long productid;
    private boolean isInStock;
}
