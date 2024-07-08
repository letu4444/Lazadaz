package Lazadar.model;

import java.util.ArrayList;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cat")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Cat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String image;
	@Column(columnDefinition = "NVARCHAR(100)")
	private String phanloai;
	private Integer soluong;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String shope;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String sotien;
	@Column(columnDefinition = "NVARCHAR(250)")
	private String name;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "produtc_id")
	private Products products;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private UserCredential userId;
	
}
