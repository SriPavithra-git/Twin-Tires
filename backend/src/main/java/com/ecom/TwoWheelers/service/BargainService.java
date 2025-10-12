package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.Bargain;
import com.ecom.TwoWheelers.model.Cart;
import com.ecom.TwoWheelers.model.UsedBike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BargainRepository;
import com.ecom.TwoWheelers.repository.CartRepository;
import com.ecom.TwoWheelers.repository.UsedBikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BargainService {

    private final BargainRepository repo;
    private final UsedBikeRepository usedBikeRepo;
    private final UserRepository userRepo;
    private final CartRepository cartRepo;
    private final CartService cartService;

    /** ✅ Create new bargain with validations */
    public Bargain createBargain(Bargain b) {
        if (b.getBikeId() == null) {
            throw new IllegalArgumentException("Bike ID must not be null when creating a bargain");
        }
        if (b.getSellerId() == null) {
            throw new IllegalArgumentException("Seller ID must not be null when creating a bargain");
        }
        if (b.getBuyerId() == null) {
            throw new IllegalArgumentException("Buyer ID must not be null when creating a bargain");
        }

        b.setStatus("PENDING");
        return repo.save(b);
    }

    /** ✅ Get all bargains by buyer */
    public List<Bargain> getByBuyer(Long buyerId) {
        return repo.findByBuyerId(buyerId);
    }

    /** ✅ Get all bargains by seller (with bike + buyer info) */
    public List<Bargain> getBySeller(Long sellerId) {
        List<Bargain> bargains = repo.findBySellerId(sellerId);

        for (Bargain b : bargains) {
            if (b.getBikeId() != null) {
                usedBikeRepo.findById(b.getBikeId()).ifPresent(bike -> {
                    b.setBikeModel(bike.getModel());
                    b.setBikeBrand(bike.getBrand());
                    b.setBikePrice(bike.getPrice());
                });
            }

            if (b.getBuyerId() != null) {
                userRepo.findById(b.getBuyerId()).ifPresent(user -> {
                    b.setBuyerName(user.getName());
                });
            }
        }

        return bargains;
    }

    /** ✅ Get all bargains for a bike */
    public List<Bargain> getByBike(Long bikeId) {
        return repo.findByBikeId(bikeId);
    }

    /** ✅ Update bargain status; if ACCEPTED, auto-add bike to buyer's cart */
    @Transactional
    public Bargain updateStatus(Long id, String status) {
        Bargain bargain = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bargain not found"));
        bargain.setStatus(status.toUpperCase());

        Bargain saved = repo.save(bargain);

        // ✅ When offer is accepted — add bike to buyer’s cart with the offered price
        if ("ACCEPTED".equalsIgnoreCase(status)) {
            Long buyerId = bargain.getBuyerId();
            Long bikeId = bargain.getBikeId();
            BigDecimal offeredPrice = bargain.getOfferedPrice();

            try {
                System.out.println("🎉 Offer accepted → Adding bike " + bikeId + " to buyer " + buyerId + " cart at price ₹" + offeredPrice);
                cartService.addUsedBikeToCartWithCustomPrice(buyerId, bikeId, offeredPrice, 1);
            } catch (Exception e) {
                System.err.println("⚠️ Failed to auto-add to cart: " + e.getMessage());
            }
        }

        return saved;
    }
    // ✅ Auto-add accepted offer to cart
    public void addAcceptedOfferToCart(Long offerId) {
        Bargain b = repo.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        if (!"ACCEPTED".equalsIgnoreCase(b.getStatus())) return;

        cartService.addUsedBikeToCartWithCustomPrice(
                b.getBuyerId(),
                b.getBikeId(),
                b.getOfferedPrice(),
                1
        );
    }




    /** ✅ Helper method: add used bike to cart */
    private void addUsedBikeToCart(User buyer, UsedBike bike) {
        // Check if it already exists in the cart (avoid duplicates)
        List<Cart> existing = cartRepo.findAllByUserIdAndNewBikeId(buyer.getId(), bike.getId());
        if (existing.isEmpty()) {
            Cart cart = new Cart();
            cart.setUser(buyer);
            cart.setNewBike(null); // this cart item represents a USED bike
            cart.setUsedBike(bike);
            cart.setQuantity(1);
            cartRepo.save(cart);
        }
    }

    /** ✅ Delete bargain by ID */
    public void deleteBargain(Long id) {
        repo.deleteById(id);
    }
}
