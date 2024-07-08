package Lazadar.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Lazadar.dto.OrderDto;
import Lazadar.model.Orderline;
import Lazadar.repository.CatRepository;
import Lazadar.repository.OrderRepository;
import Lazadar.repository.UserCredenRepository;



@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private CatRepository catRepository;

	@Autowired
	private UserCredenRepository credenRepository;

	// Lưu checkout vào sql
	public void OrderSave(OrderDto dto) {
		Orderline orderline1 = new Orderline();
		
		Orderline orderline = Orderline.builder()
	             .image(dto.getImage())
	             .name(dto.getName())
	             .orderNumber(dto.getOrderNumber())
	             .ngaydat(LocalDate.now().getDayOfMonth()+"/"+LocalDate.now().getMonthValue()+"/"+LocalDate.now().getYear()+","+LocalTime.now().getHour()+":"+LocalTime.now().getMinute()+":"+LocalTime.now().getSecond())
	             .phanloai(dto.getPhanloai())
	             .shipe(dto.getShipe())
	             .shope(dto.getShope())
	             .sl(dto.getSl())
	             .sotien(dto.getSotien())
	             .trangthai(dto.getTrangthai())
	             .userid(credenRepository.findOneById(dto.getUserId()))
	             .build();
			orderline1 = orderRepository.save(orderline);
			if (orderline1.getId() != null) {
				catRepository.deleteById(dto.getIdsp());
			}
	}

	// Kiểm tra đơn hàng xem đã thanh toán chưa
	public List<OrderDto> listOrder(String orderNumber ,Long userid,Long id) {
		List<OrderDto> dtos = orderRepository.findByOrdernumberOfUserid(orderNumber, userid, id).stream()
				             .map(order -> OrderDto.builder().image(order.getImage()).name(order.getName())
				            		 .ngaydat(order.getNgaydat())
				     				.orderNumber(order.getOrderNumber()).phanloai(order.getPhanloai()).id(order.getId())
				    				.shope(order.getShope()).sl(order.getSl()).shipe(order.getShipe()).sotien(order.getSotien())
				    				.trangthai(order.getTrangthai()).userId(order.getUserid().getId()).build())
				                .toList();
		
		return dtos;
	}

	// Lấy hết theo userid
	public List<OrderDto> listOrderUserid(Long userid) {
		return orderRepository.findByUserid(userid).stream()
				.map(checkout -> OrderDto.builder().image(checkout.getImage()).name(checkout.getName())
						.orderNumber(checkout.getOrderNumber()).phanloai(checkout.getPhanloai()).id(checkout.getId())
						.shope(checkout.getShope()).sl(checkout.getSl()).shipe(checkout.getShipe())
						.sotien(checkout.getSotien()).trangthai(checkout.getTrangthai())
						.userId(checkout.getUserid().getId()).build())
				.toList();
	}

	// Lấy 3 số orderNumber theo userid
	public String[][] listCheckoutOrder(Long userid){
	return orderRepository.listOrderNumber(userid);
	}
	// xóa đơn thanh toán đi
	public void delete(String orderNumber) {
		orderRepository.deleteByOrderNumber(orderNumber);
	}
}
