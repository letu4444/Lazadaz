package Lazadar.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    @Column(columnDefinition = "NVARCHAR(250)")
    private String name;
    @Column(columnDefinition = "NVARCHAR(100)")
	private String description;
	
	private String image;
	private String phanloai;
	@Column(columnDefinition = "NVARCHAR(100)")
	private String shope;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String sotien;
	@Column(columnDefinition = "NVARCHAR(50)")
	private String saletien;
	@OneToMany(mappedBy = "products")
	private List<Cat> cat = new ArrayList<>();
	@OneToOne(mappedBy = "products")
	private Inventory inventory;
	
	@OneToMany(mappedBy = "products")
	private List<Imagephu> imagephus = new ArrayList<>();
	
	@OneToMany(mappedBy = "products")
	private List<Phanloai1> phanloai1s = new ArrayList<>();
	
	@OneToMany(mappedBy = "products")
	private List<Phanloai2> phanloai2s = new ArrayList<>();
	
	@OneToMany(mappedBy = "products")
	private List<Nhomphanloai> nhomphanloais = new ArrayList<>();
}
