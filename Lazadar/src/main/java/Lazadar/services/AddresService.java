package Lazadar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Lazadar.dto.AddressDto;
import Lazadar.model.Address;
import Lazadar.repository.AddressRepository;
import Lazadar.repository.UserCredenRepository;



@Service
public class AddresService {

	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserCredenRepository credenRepository;
	
	//Lưu địa chỉ vào
	public void AddressSave(AddressDto dto) {
		Address address = Address.builder()
				          .huyen(dto.getHuyen())
				          .iphone(dto.getIphone())
				          .name(dto.getName())
				          .xa(dto.getXa())
				          .tinh(dto.getTinh())
				          .user(credenRepository.findOneById(dto.getUserid()))
				          .build();
		addressRepository.save(address);
	}
	//LẤy thông tin theo userid
	public AddressDto UserId(Long id) {
		Address address = addressRepository.findByUserId(id);
		AddressDto addressDto = new AddressDto();
		if(address != null) {
			 addressDto = AddressDto.builder()
		               .huyen(address.getHuyen())
		               .iphone(address.getIphone())
		               .id(address.getId())
		               .name(address.getName())
		               .tinh(address.getTinh())
		               .userid(address.getUser().getId())
		               .xa(address.getXa())
		               .build();
		}else {
			addressDto = null;
		}
		
		return addressDto;
	}
}
