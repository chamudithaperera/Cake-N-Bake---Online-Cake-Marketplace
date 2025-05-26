package com.fast_food.repository;

import com.fast_food.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

    @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
    List <Restaurant> findBySearchQuery(String query);

    Restaurant findByOwnerId(Long userId);

    @Query(value = "SELECT * FROM restaurant WHERE owner_id = :userId LIMIT 1", nativeQuery = true)
    Optional<Restaurant> findByUserId(@Param("userId") Long userId);


}