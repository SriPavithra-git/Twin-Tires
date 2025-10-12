package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.Role;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private Long id;
    private String name;
    private Role role;
    private String message;
}
