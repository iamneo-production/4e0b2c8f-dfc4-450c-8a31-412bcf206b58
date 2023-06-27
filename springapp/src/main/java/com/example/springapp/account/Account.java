package com.example.springapp.account;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Account {
    @Id
    private int accountId;
    private String name;
    private double currentBalance;
    private boolean isCreditCardEnabled;
    private boolean isDebitCardEnabled;
    private boolean isUpiEnabled;
    private boolean isNetBankingEnabled;
    private boolean isDeleted;
    private Date createdAt;
    private Date updatedAt;

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
