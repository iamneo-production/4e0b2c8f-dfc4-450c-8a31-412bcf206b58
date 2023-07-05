package com.example.springapp.account;

import com.example.springapp.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;
    private String name;
    private double currentBalance;
    private boolean isCreditCardEnabled;
    private boolean isDebitCardEnabled;
    private boolean isUpiEnabled;
    private boolean isNetBankingEnabled;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean isDeleted;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name= "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private UserEntity user;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public boolean isCreditCardEnabled() {
        return isCreditCardEnabled;
    }

    public void setCreditCardEnabled(boolean creditCardEnabled) {
        isCreditCardEnabled = creditCardEnabled;
    }

    public boolean isDebitCardEnabled() {
        return isDebitCardEnabled;
    }

    public void setDebitCardEnabled(boolean debitCardEnabled) {
        isDebitCardEnabled = debitCardEnabled;
    }

    public boolean isUpiEnabled() {
        return isUpiEnabled;
    }

    public void setUpiEnabled(boolean upiEnabled) {
        isUpiEnabled = upiEnabled;
    }

    public boolean isNetBankingEnabled() {
        return isNetBankingEnabled;
    }

    public void setNetBankingEnabled(boolean netBankingEnabled) {
        isNetBankingEnabled = netBankingEnabled;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
