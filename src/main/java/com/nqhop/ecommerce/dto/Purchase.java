package com.nqhop.ecommerce.dto;

import com.nqhop.ecommerce.entity.Address;
import com.nqhop.ecommerce.entity.Customer;
import com.nqhop.ecommerce.entity.Order;
import com.nqhop.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
