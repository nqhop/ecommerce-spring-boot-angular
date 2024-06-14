package com.nqhop.ecommerce.entity;

import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column
    private String sku;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private BigDecimal unitPrice;

    @Column
    private String imageUrl;

    @Column
    private boolean active;

    @Column
    private int unitsInStock;

    @Column
    @CreationTimestamp
    private Date dateCreated;

    @Column
    @UpdateTimestamp
    private Date lastUpdated;
}
