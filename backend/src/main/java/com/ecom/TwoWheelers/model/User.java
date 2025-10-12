package com.ecom.TwoWheelers.model;

import com.ecom.TwoWheelers.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // <- rename from UserId to id

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.BUYER;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Address> addresses;

}
