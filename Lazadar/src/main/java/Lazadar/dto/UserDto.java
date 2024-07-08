package Lazadar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDto {

	
    private Long id;
	
	private String username;
	
	private String password;
	
	private String email;
	
	private String image;
	
	private String iphone;
	
	private String userid;
	
}
