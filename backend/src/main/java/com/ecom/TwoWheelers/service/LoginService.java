package com.ecom.TwoWheelers.service;


import com.ecom.TwoWheelers.dto.LoginRequestDTO;
import com.ecom.TwoWheelers.dto.LoginResponseDTO;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private RegisterRepo registerRepo;

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        Optional<User> user=registerRepo.findByEmail(loginRequestDTO.getEmail());
        LoginResponseDTO response=new LoginResponseDTO();
        if(user.isEmpty()){
            response.setMessage("Invalid email");
        }
        else {
        if(user.get().getPassword().equalsIgnoreCase(loginRequestDTO.getPassword())){
            response.setMessage("Login successfull!");
            response.setName(user.get().getName());
            response.setRole(user.get().getRole());
        }
        else{
            response.setMessage("invalid password");
        }
        }

        return response;
    }
}
