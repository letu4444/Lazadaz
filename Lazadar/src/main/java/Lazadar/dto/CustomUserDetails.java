package Lazadar.dto;



import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import Lazadar.model.Role;
import Lazadar.model.UserCredential;



;



public class CustomUserDetails implements UserDetails{

   private UserCredential credential;
   
   

   

    public CustomUserDetails(UserCredential credential) {
	super();
	this.credential = credential;
}
    

	public CustomUserDetails() {
		super();
	}


	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	Set<Role> roles = credential.getRoles();
    	Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    	for (Role role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
			
		}
        return authorities;
    }

    @Override
    public String getPassword() {
        return credential.getPassword();
    }

    @Override
    public String getUsername() {
        return credential.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

	public UserCredential getCredential() {
		return credential;
	}

	public void setCredential(UserCredential credential) {
		this.credential = credential;
	}
    
}