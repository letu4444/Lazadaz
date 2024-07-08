package Lazadar.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
@Builder
public class Address {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private Long id;
       @Column(columnDefinition = "NVARCHAR(50)")
	   private String name;
	   private Number iphone;
	   @Column(columnDefinition = "NVARCHAR(50)")
	   private String tinh;
	   @Column(columnDefinition = "NVARCHAR(50)")
	   private String huyen;
	   @Column(columnDefinition = "NVARCHAR(50)")
	   private String xa;
	   @ManyToOne(fetch = FetchType.EAGER)
		@JoinColumn(name = "user_id")
	   private UserCredential user;
}
