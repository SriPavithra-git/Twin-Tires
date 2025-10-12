package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Bargain;
import com.ecom.TwoWheelers.service.BargainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/bargains")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BargainController {

    private final BargainService bargainService;

    @PostMapping
    public Bargain create(@RequestBody Bargain b) {
        return bargainService.createBargain(b);
    }

    @GetMapping("/buyer/{buyerId}")
    public List<Bargain> getByBuyer(@PathVariable Long buyerId) {
        return bargainService.getByBuyer(buyerId);
    }

    @GetMapping("/seller/{sellerId}")
    public List<Bargain> getBySeller(@PathVariable Long sellerId) {
        return bargainService.getBySeller(sellerId);
    }

    @GetMapping("/bike/{bikeId}")
    public List<Bargain> getByBike(@PathVariable Long bikeId) {
        return bargainService.getByBike(bikeId);
    }

    @PutMapping("/{id}")
    public Bargain updateStatus(@PathVariable Long id, @RequestParam String status) {
        return bargainService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bargainService.deleteBargain(id);
    }
}
