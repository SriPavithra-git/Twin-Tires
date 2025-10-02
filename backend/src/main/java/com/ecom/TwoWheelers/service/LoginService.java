package com.ecom.TwoWheelers.service;


import com.ecom.TwoWheelers.dto.LoginRequest;
import com.ecom.TwoWheelers.dto.LoginResponse;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private RegisterRepo registerRepo;

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> user=registerRepo.findByEmail(loginRequest.getEmail());
        LoginResponse response=new LoginResponse();
        if(user.isEmpty()){
            response.setMessage("Invalid username or password");
        }
        if(user.isPresent()){
            response.setMessage("Login successfull!");
            response.setName(user.get().getName());
            response.setRole(user.get().getRole());
        }
        return response;
    }
}
