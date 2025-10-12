package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.LoginRequestDTO;
import com.ecom.TwoWheelers.dto.LoginResponseDTO;
import com.ecom.TwoWheelers.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174","http://localhost:5175"})
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/user")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginRequestDTO loginRequestDTO){
        LoginResponseDTO loginResponseDTO = loginService.login(loginRequestDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }
}
