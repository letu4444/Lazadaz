package Lazadar.config;
//import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebconfigClient {

	//đâu là nơi để kết nối các fun cùng nhau vào 
		//Để tránh mất cân bằng về các phiên bản khác nhau
		
	@Bean
//	@Order
//	@LoadBalanced
	public WebClient.Builder webClient(){
		return WebClient.builder();
	}
}
