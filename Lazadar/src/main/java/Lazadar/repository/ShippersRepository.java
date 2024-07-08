package Lazadar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import Lazadar.model.Shipper;



@Transactional
public interface ShippersRepository extends JpaRepository<Shipper, Long>{

}
