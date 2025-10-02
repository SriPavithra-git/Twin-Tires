package com.ecom.TwoWheelers.controllers;


import com.ecom.TwoWheelers.dto.Userdto;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("register/")
@CrossOrigin("*")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("user")
    public ResponseEntity register(@RequestBody Userdto dto){
        User user= registerService.registerUser(dto);
        return ResponseEntity.ok(user);
    }
}
