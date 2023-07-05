package com.example.springapp.transaction;

import com.example.springapp.account.Account;
import com.example.springapp.category.Category;
import com.example.springapp.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private double amount;
    private String description;
    private String type;
    private String paymentType;

    @ManyToOne
    @JoinColumn()
    private Category category;

    @ManyToOne
    @JoinColumn()
    private Account account;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private UserEntity user;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean isDeleted;

    @CreationTimestamp
    private Date isCreated;

    @UpdateTimestamp
    private Date isUpdated;

    public Transaction() {

    }

    public Transaction(double amount, String description, String type, String paymentType, Category category, Account account, UserEntity user) {
        this.amount = amount;
        this.description = description;
        this.type = type;
        this.paymentType = paymentType;
        this.category = category;
        this.account = account;
        this.user = user;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getIsCreated() {
        return isCreated;
    }

    public void setIsCreated(Date isCreated) {
        this.isCreated = isCreated;
    }

    public Date getIsUpdated() {
        return isUpdated;
    }

    public void setIsUpdated(Date isUpdated) {
        this.isUpdated = isUpdated;
    }
}
