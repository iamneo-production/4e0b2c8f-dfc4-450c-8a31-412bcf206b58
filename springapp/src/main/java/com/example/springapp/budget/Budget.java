package com.example.springapp.budget;


import com.example.springapp.category.Category;
import com.example.springapp.user.UserEntity;

import javax.persistence.*;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private double amount;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public Budget() {

    }

    public Budget(Category category, double amount, UserEntity user) {
        this.category = category;
        this.amount = amount;
        this.user = user;
    }


//Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    /*@Override
    public String toString() {
        return "Budget{" +
                "id=" + id +
                ", budgetId='" + budgetId + '\'' +
                ", category=" + category +
                ", amount=" + amount +
                '}';
    }*/
}
