package Lazadar.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ordersanpham")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Orderline {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String orderNumber;
	private String sotien;
	private String image;
	@Column(columnDefinition = "NVARCHAR(100)")
	private String phanloai;
	private Integer sl;
	private String shope;
	@Column(columnDefinition = "NVARCHAR(250)")
	private String name;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String shipe;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String trangthai;
	@Column(columnDefinition = "NVARCHAR(80)")
	private String ngaydat;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private UserCredential userid;
}
