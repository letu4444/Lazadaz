package Lazadar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import Lazadar.uitl.SocketHandler;





@Configuration
@EnableWebSocket 
@EnableWebSocketMessageBroker
public class WebSoketconfig implements WebSocketMessageBrokerConfigurer , WebSocketConfigurer{

	
	@Override
	//Ký hiệu của websocket
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// TODO Auto-generated method stub
		registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
	}
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// TODO Auto-generated method stub
		//Nơi tiếp nhận đầu vào của các tín hiệu từ bên clien gửi đến
				registry.setApplicationDestinationPrefixes("/app");
				
				//Nơi sẽ về đúng địa chỉ muốn đến của client đó
				registry.enableSimpleBroker("/user","/groud");
				//nếu muốn đổ về từng user riêng biiejt
				registry.setUserDestinationPrefix("/user");
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		 registry.addHandler(new SocketHandler(),"/socket1").setAllowedOrigins("*");
	}

}
