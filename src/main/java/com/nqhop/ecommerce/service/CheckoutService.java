package com.nqhop.ecommerce.service;

import com.nqhop.ecommerce.dto.Purchase;
import com.nqhop.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
