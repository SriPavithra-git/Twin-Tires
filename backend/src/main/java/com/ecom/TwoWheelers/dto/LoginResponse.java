package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.Role;
import lombok.Data;

@Data
public class LoginResponse {
    private String name;
    private Role role;
    private String message;
}
