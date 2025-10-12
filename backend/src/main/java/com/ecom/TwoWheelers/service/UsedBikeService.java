package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.model.UsedBike;
import com.ecom.TwoWheelers.repository.UsedBikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsedBikeService {

    private final UsedBikeRepository usedBikeRepository;

    public UsedBike saveUsedBike(UsedBike usedBike) {
        return usedBikeRepository.save(usedBike);
    }

    public List<UsedBike> getAllUsedBikes() {
        return usedBikeRepository.findAll();
    }

    public List<UsedBike> getBySeller(Long sellerId) {
        return usedBikeRepository.findBySellerId(sellerId);
    }

    public UsedBike getById(Long id) {
        return usedBikeRepository.findById(id).orElse(null);
    }

    public void deleteUsedBike(Long id) {
        usedBikeRepository.deleteById(id);
    }
}