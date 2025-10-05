package com.ecom.TwoWheelers.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecom.TwoWheelers.model.Address;
import com.ecom.TwoWheelers.service.AddressService;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "*")
public class AddressController {

    @Autowired
    private AddressService addressService;

    // ➕ Add new address
    @PostMapping("/add")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {
        return ResponseEntity.ok(addressService.saveAddress(address));
    }

    // 📋 Get all addresses for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddressesByUser(userId));
    }

    // ❌ Delete address
    @DeleteMapping("/delete/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok("Address deleted successfully");
    }
}
