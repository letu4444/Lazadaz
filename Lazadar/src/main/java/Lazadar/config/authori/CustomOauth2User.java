package Lazadar.config.authori;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import Lazadar.model.UserCredential;



public class CustomOauth2User implements OidcUser {
//	OidcUser
	private String oauth2ClientName;
	private OAuth2User auth2User;
	private UserCredential credential;
	
	
	public CustomOauth2User(String oauth2ClientName, OAuth2User auth2User, UserCredential credential) {
		super();
		this.oauth2ClientName = oauth2ClientName;
		this.auth2User = auth2User;
		this.credential = credential;
	}
	 
	

	public CustomOauth2User(String oauth2ClientName, OAuth2User auth2User) {
		super();
		this.oauth2ClientName = oauth2ClientName;
		this.auth2User = auth2User;
	}



	@Override
	public Map<String, Object> getAttributes() {
		// TODO Auto-generated method stub
		return auth2User.getAttributes();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return auth2User.getAuthorities();
	}

	@Override
	public String getName() {
		   System.out.println(auth2User.<String>getAttribute("email"));
	        System.out.println(auth2User.<String>getAttribute("name"));
	        System.out.println(auth2User.<String>getAttribute("picture"));
	        OidcIdToken idToken = ((OidcUser) auth2User).getIdToken();
	         String idTokenValue = idToken.getTokenValue();
	         OidcUserInfo userInfo = ((OidcUser) auth2User).getUserInfo();
//	         String idTokenv = userInfo.getBirthdate();
	        System.out.println(idTokenValue);
	        System.out.println(userInfo);
		return auth2User.<String>getAttribute("name");
	}
	//Lấy ảnh khi dùng googe
	public String Image() {
		return auth2User.<String>getAttribute("picture");
	}

	public String Email() {
		return auth2User.<String>getAttribute("email");
		
	}

	public String getOauth2ClientName() {
		return this.oauth2ClientName;
	}



	public UserCredential getCredential() {
		return credential;
	}



	public void setCredential(UserCredential credential) {
		this.credential = credential;
	}



	@Override
	public Map<String, Object> getClaims() {
	
		return null;
	}



	@Override
	public OidcUserInfo getUserInfo() {
		OidcUserInfo userInfo = ((OidcUser) auth2User).getUserInfo();
        String idTokenValue = userInfo.getBirthdate();
		return userInfo;
	}



	@Override
	public OidcIdToken getIdToken() {
		 OidcIdToken idToken = ((OidcUser) auth2User).getIdToken();
         String idTokenValue = idToken.getTokenValue();
		return  idToken;
	}
	
	
}
