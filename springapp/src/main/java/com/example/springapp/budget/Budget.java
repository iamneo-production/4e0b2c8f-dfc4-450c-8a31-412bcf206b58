package com.example.springapp.budget;


import com.example.springapp.user.UserEntity;

import javax.persistence.*;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String budgetId;
    private String category;
    private double amount;
    @ManyToOne
    private UserEntity user;

    public Budget() {

    }

    public Budget(Long id, String budgetId, String category, double amount) {
        this.id = id;
        this.budgetId = budgetId;
        this.category = category;
        this.amount = amount;
    }

    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(String budgetId) {
        this.budgetId = budgetId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
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
