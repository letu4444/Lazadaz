package Lazadar.model;




import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "usercreden")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserCredential {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	
	private String password;
	
	private String email;
	
	private String image;
	@Column(length = 50)
	private String iphone;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	        name = "users_roles",
	        joinColumns = @JoinColumn(name = "user_id"),
	        inverseJoinColumns = @JoinColumn(name = "role_id"))
	
    private Set<Role> roles = new HashSet<>();
	
	@OneToMany(mappedBy = "user")
	private List<Address> addresses = new ArrayList<>();
	
	@OneToMany(mappedBy = "userId")
	private List<Cat> cat= new ArrayList<>();
	
	@OneToMany(mappedBy = "userid")
	private List<Orderline> order = new ArrayList<>();

}
