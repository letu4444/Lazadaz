package Lazadar.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import Lazadar.config.authori.CustomLogoutSuccessHandler;
import Lazadar.config.authori.CustomOauth2UserServer;
//import Lazadar.config.authori.CustomRequestCache;
import Lazadar.config.authori.OAuth2LoginSuccessHandler;
import Lazadar.security.CustomAccessDeniedHandler;
import Lazadar.services.CustomUserDetailsService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(Csrf -> Csrf.disable())

				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers("/trangchu/**", "/register/**", "/api/search/**", "/checkout/**", "/login/**")
						.permitAll().anyRequest().authenticated())
				.formLogin(formLogin -> formLogin.loginPage("/login")

						.failureUrl("/login?error=true").successHandler(succsessHandler).permitAll())

				.oauth2Login(Login -> Login.loginPage("/login").userInfoEndpoint(userInfo -> userInfo
//					        .userAuthoritiesMapper(this.userAuthoritiesMapper())
//					        .userService(this.oauth2UserService())
						.oidcUserService(this.customOauth2UserServer)).successHandler(succsessHandler))
                .exceptionHandling(accs ->accs.accessDeniedHandler(accessDeniedHandler()))
				.logout(logout -> logout.logoutUrl("/perform_logout").deleteCookies("JSESSIONID")
						.logoutSuccessHandler(logoutSuccessHandler())
//				.invalidateHttpSession(true)
				).sessionManagement(sessionManage -> sessionManage.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
				.authenticationProvider(daoAuthenticationProvider()).securityContext(
						security -> security.securityContextRepository(new HttpSessionSecurityContextRepository()))
				
				;

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.debug(false).ignoring().requestMatchers("/image/**", "/css/**", "/favicon.ico", "/js/**");
	}

	@Autowired
	private PasswordConfig passwordConfig;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userDetailsService);
		auth.setPasswordEncoder(passwordConfig.passwordEncoder());
		return auth;
	}

	@Autowired
	private CustomOauth2UserServer customOauth2UserServer;

	@Bean
	public LogoutSuccessHandler logoutSuccessHandler() {
		return new CustomLogoutSuccessHandler();
	}

	// Nơi trả ra quyền k đúng
	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}

	@Autowired
	private OAuth2LoginSuccessHandler succsessHandler;
}
