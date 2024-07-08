package Lazadar.config.authori;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import Lazadar.model.UserCredential;
import Lazadar.repository.UserCredenRepository;




@Service
public class CustomOauth2UserServer extends OidcUserService{
//	OidcUserService
	@Autowired
	private UserCredenRepository credenRepository;


//	@Override
//	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//		String clietName = userRequest.getClientRegistration().getClientName();
//		OAuth2User oAuth2User = super.loadUser(userRequest);
//		UserCredential user = new UserCredential();
//		if(credenRepository.findOneByUsername(oAuth2User.<String>getAttribute("name")) == null) {
//			user.setEmail(oAuth2User.<String>getAttribute("email"));
//			user.setUsername(oAuth2User.<String>getAttribute("name"));
//			user.setImage(oAuth2User.<String>getAttribute("picture"));
//		}else {
//			user = credenRepository.findOneByUsername(oAuth2User.<String>getAttribute("name"));
//		}
//		return new CustomOauth2User(clietName, oAuth2User, user);
//	}
	@Override
	public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
		// TODO Auto-generated method stub
		String clietName = userRequest.getClientRegistration().getClientName();
		OAuth2User oAuth2User = super.loadUser(userRequest);
		UserCredential user = new UserCredential();
		if(credenRepository.findOneByUsername(oAuth2User.<String>getAttribute("name")) == null) {
		user.setEmail(oAuth2User.<String>getAttribute("email"));
		user.setUsername(oAuth2User.<String>getAttribute("name"));
		user.setImage(oAuth2User.<String>getAttribute("picture"));
	   }else {
		user = credenRepository.findOneByUsername(oAuth2User.<String>getAttribute("name"));
	   }
	     return new CustomOauth2User(clietName, oAuth2User, user);
	}
}
