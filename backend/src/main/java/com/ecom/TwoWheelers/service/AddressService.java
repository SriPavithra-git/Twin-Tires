package com.ecom.TwoWheelers.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecom.TwoWheelers.model.Address;
import com.ecom.TwoWheelers.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    public List<Address> getAddressesByUser(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}
