package Lazadar.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import Lazadar.config.WebconfigClient;
import Lazadar.dto.CustomUserDetails;
import Lazadar.dto.UserDto;
import Lazadar.model.UserCredential;
import Lazadar.services.AuthService;
import Lazadar.services.CustomUserDetailsService;
import Lazadar.uitl.Next;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;




@Controller
@RequestMapping
public class RegistersController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private CustomUserDetailsService userDetailsService; 
	
	@Autowired
	private WebconfigClient webconfigClient;
	
	@Autowired
	private Next next1;

	@GetMapping("/login")
	public String LoginPage(@RequestParam(value = "next",required = false) String next,HttpServletRequest request ) {
		  String referrer = request.getHeader("Referer");
		
		    if(referrer!=null && referrer.contains("/login") != true){
		        request.getSession().setAttribute("url_prior", referrer);
		    }
		return "dangnhap";
	}
	
	@GetMapping("/register")
	public String Register() {
		return "dangky1";
	}
	@PostMapping("/register")
	public String RegisterPage(@ModelAttribute("user") UserDto dto,Model model,HttpServletRequest request) {
		UserCredential oke = authService.SaveUser(dto);
		if(oke.getUsername() != null) {
			CustomUserDetails details = (CustomUserDetails) userDetailsService.loadUserByUsername(dto.getUsername());
			authWithoutPassword(details,request);
			return "redirect:/trangchu";
		}else {
		return "redirect:/register?error=username";

		}
		

	
	}
	//Nơi lưu user vaào autho
		public void authWithoutPassword(CustomUserDetails details,HttpServletRequest request) {
//			 CustomUserDetails details = (CustomUserDetails) authService.loadUserByUsername(jwt.getSubject());
	    	    Set<SimpleGrantedAuthority> authorities = (Set<SimpleGrantedAuthority>) details.getAuthorities();
//			     List<SimpleGrantedAuthority> authorities = credential.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
				Authentication authentication = new UsernamePasswordAuthenticationToken(details,null,authorities);

				SecurityContextHolder.getContext().setAuthentication(authentication);
				 HttpSession session = request.getSession(true);
			        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
		}
}
