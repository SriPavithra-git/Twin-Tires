package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.LoginRequest;
import com.ecom.TwoWheelers.dto.LoginResponse;
import com.ecom.TwoWheelers.service.LoginService;
import com.ecom.TwoWheelers.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;
    @GetMapping("user")
    public ResponseEntity loginUser(@RequestBody LoginRequest loginRequest){

        LoginResponse loginResponse= loginService.login(loginRequest);
        return ResponseEntity.ok(loginResponse);

    }
}
