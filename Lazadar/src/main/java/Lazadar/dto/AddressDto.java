package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class AddressDto {
   private Long id;
   private String name;
   private Number iphone;
   private String tinh;
   private String huyen;
   private String xa;
   private Long userid;
   
   
}
