package Lazadar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import Lazadar.dto.Message;





@Controller
public class ChatController {

	//nơi đọc từng user đi qua nó
		@Autowired
		private SimpMessagingTemplate simpMessagingTemplate;
		
		//Nơi gửi chap chung với kết nối xem client nào vào rồi
		@MessageMapping("/message")
		@SendTo("/groud/public")
		public Message receiveMessage(@Payload Message message) {
			return message;
		}
		//Gửi  riêng tử user
		@MessageMapping("/messageuser")
		public Message UserChat(@Payload Message message) {
			simpMessagingTemplate.convertAndSendToUser(message.getRender(), "/usermessage", message);
			return message;
		}
}
