package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.dto.Userdto;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepo registerRepo;
    public User registerUser(Userdto dto) {
        User user=new User();
        user.setName(dto.getName());
        user.setPhno(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        return registerRepo.save(user);




    }
}
