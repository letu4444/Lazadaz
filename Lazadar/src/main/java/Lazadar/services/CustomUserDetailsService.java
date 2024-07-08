package Lazadar.services;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Lazadar.dto.CustomUserDetails;
import Lazadar.model.Role;
import Lazadar.model.UserCredential;
import Lazadar.repository.RoleRepository;
import Lazadar.repository.UserCredenRepository;





@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserCredenRepository credenRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
//	@Autowired
//	private PasswordConfig passwordConfig;

	

	public CustomUserDetailsService() {
		super();
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			UserCredential users = credenRepository.findOneByUsername(username);
			if(users == null) {
				throw new UsernameNotFoundException("Chưa tồn tại tài khoản");
			}
		   return new CustomUserDetails(users);
		} catch (Exception e) {
			 throw new RuntimeException(e);
		}
	}
	
	//Nơi chạy role dể kiểm tra xem nó là user hay admin
		private Collection<? extends GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
			return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
		}
		

}
