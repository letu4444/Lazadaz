package Lazadar.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "shippers")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Shipper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    @Column(columnDefinition = "NVARCHAR(50)")
	private String tenshippers;
	private String orderNumber;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String trangthai;
}
