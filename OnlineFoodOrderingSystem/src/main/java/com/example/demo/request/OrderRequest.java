package com.example.demo.request;

import com.example.demo.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;

    private String mobile;

    private  String sessionId;

    private long total;


}
