package com.ecom.TwoWheelers.model;


import com.ecom.TwoWheelers.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long UserId;

    private String name;

    @Column(unique = true,nullable = false)
    private String email;
    private String phno;

    @Enumerated(EnumType.STRING)
    private Role role=Role.BUYER;
}
