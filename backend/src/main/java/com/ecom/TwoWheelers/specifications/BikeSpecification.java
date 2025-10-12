package com.ecom.TwoWheelers.specifications;

import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import com.ecom.TwoWheelers.model.UsedBike;
import org.springframework.data.jpa.domain.Specification;

public class BikeSpecification {

    public static Specification<UsedBike> hasBrand(String brand) {
        return (root, query, cb) ->
                brand == null ? null : cb.like(cb.lower(root.get("brand")), "%" + brand.toLowerCase() + "%");
    }

    public static Specification<UsedBike> hasModel(String model) {
        return (root, query, cb) ->
                model == null ? null : cb.like(cb.lower(root.get("model")), "%" + model.toLowerCase() + "%");
    }

    public static Specification<UsedBike> hasFuelType(FuelType fuelType) {
        return (root, query, cb) ->
                fuelType == null ? null : cb.equal(root.get("fuelType"), fuelType);
    }

    public static Specification<UsedBike> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null && maxPrice == null) return null;
            if (minPrice == null) return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
            if (maxPrice == null) return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
            return cb.between(root.get("price"), minPrice, maxPrice);
        };
    }

    public static Specification<UsedBike> hasMileage(String mileage) {
        return (root, query, cb) ->
                mileage == null ? null : cb.like(cb.lower(root.get("mileage")), "%" + mileage.toLowerCase() + "%");
    }

    public static Specification<UsedBike> hasEngineCapacity(String engineCapacity) {
        return (root, query, cb) ->
                engineCapacity == null ? null : cb.like(cb.lower(root.get("engineCapacity")), "%" + engineCapacity.toLowerCase() + "%");
    }

    public static Specification<UsedBike> hasYear(Integer year) {
        return (root, query, cb) ->
                year == null ? null : cb.equal(root.get("year"), year);
    }

    public static Specification<UsedBike> hasType(BikeType type) {
        return (root, query, cb) ->
                type == null ? null : cb.equal(root.get("type"), type);
    }

    public static Specification<UsedBike> hasOwnerType(Integer ownerType) {
        return (root, query, cb) ->
                ownerType == null ? null : cb.equal(root.get("ownerType"), ownerType);
    }

    public static Specification<UsedBike> hasCondition(String condition) {
        return (root, query, cb) ->
                condition == null ? null : cb.like(cb.lower(root.get("condition")), "%" + condition.toLowerCase() + "%");
    }

    public static Specification<UsedBike> hasCity(String city) {
        return (root, query, cb) ->
                city == null ? null : cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase() + "%");
    }
}
