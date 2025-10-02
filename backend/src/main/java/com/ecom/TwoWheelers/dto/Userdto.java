package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.Role;
import lombok.Data;

@Data
public class Userdto {
    private String name;
    private String phone;
    private String email;
    private String password;
    private Role role;
}
