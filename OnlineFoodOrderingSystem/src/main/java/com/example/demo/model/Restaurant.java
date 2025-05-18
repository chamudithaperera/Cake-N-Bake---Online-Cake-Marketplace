package com.fast_food.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String cuisineType;
    private String contactInformation;
    private String images;
    private String openingHours;
    private boolean isOpen = true;

    private LocalDateTime registrationDateTime;

    @ManyToOne
    private User owner;

    @OneToOne
    private Address address;

   
}