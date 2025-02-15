package Lazadar.services;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Lazadar.dto.UserDto;
import Lazadar.enumRole.UserRole;
import Lazadar.model.UserCredential;
import Lazadar.repository.RoleRepository;
import Lazadar.repository.UserCredenRepository;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class AuthService {

	@Autowired
	private UserCredenRepository credenRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private UserRole role;
	
//	private boolean check;
	
	public AuthService(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	  
    //Lưu thoong tin ng dùng vào sql
	public UserCredential SaveUser(UserDto userDto) {
		
		UserCredential userCredential = new UserCredential();
		//Kiểm tra xem có email tồn tại chưa
//		if(userDto.getEmail() !=null || userDto.getIphone() != null) {
//			check = checkEmail(userDto.getEmail());
//			check= checkIphone(userDto.getIphone());		
//		}
//		if(check) {
//		//Đã tồn tại rồi vui lòng kiểm tra lại
//		}else {
			UserCredential credential = UserCredential.builder()
	                   .id(userDto.getId())
	                   .email(userDto.getEmail())
	                   .image(userDto.getImage())
                    .username(userDto.getUsername())
	                  .password(passwordEncoder.encode(userDto.getPassword()))
	                  .iphone(userDto.getIphone())
	                  .roles(new HashSet<>(Arrays.asList(roleRepository.findByName(role.USER_ROLE))))
	                  .build();
			userCredential  = credenRepository.save(credential);
//		}
		
		                  
		return userCredential;
	}
	


	//Lấy token ra để gửi đi các nơi cần thông tin khách hàng
	public String generateToken(String username) {
//		return jwtService.generateToken(username);
		return null;
	}
	
	//ValidateToken Để giải mã lại cho họ biếtai đó và còn hiển thi trên client nữa
	public void validateToken(String token) {
//		jwtService.validateToken(token);
	}
	public UserDto getUser(String username) {
		UserCredential userCredential = credenRepository.findOneByUsername(username);
		UserDto dto = UserDto.builder().id(userCredential.getId())
				     .username(userCredential.getUsername())
				     .password(userCredential.getPassword())
				     .email(userCredential.getEmail())
				     .build();
		return dto;
	}
	
	//Nơi đâu kiểm tra xem email đó tồn tâij chưa
	private boolean checkEmail (String email) {
		return credenRepository.findByEmail(email) != null;
	}
	//Nơi đâu kiểm tra xem số điện thoại đó tồn tâij chưa
		private boolean checkIphone (String iphone) {
			return credenRepository.findByIphone(iphone) != null;
		}
}
