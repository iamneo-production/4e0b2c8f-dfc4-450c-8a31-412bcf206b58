package com.example.springapp.account;

import java.util.Arrays;
import java.util.List;

public class AccountResponseDto {
    private int accountId;
    private String name;
    private double currentBalance;
    private String paymentTypes;
    private double totalExpense;
    private double totalIncome;

    public AccountResponseDto(int accountId, String name, double currentBalance, List<String> paymentTypes, double totalExpense, double totalIncome) {
        this.accountId = accountId;
        this.name = name;
        this.currentBalance = currentBalance;
        this.paymentTypes = String.join(", ", paymentTypes);
        this.totalExpense = totalExpense;
        this.totalIncome = totalIncome;
    }

    public AccountResponseDto() {
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

    public List<String> getPaymentTypes() {
        return Arrays.asList(paymentTypes.split(", "));
    }

    public void setPaymentTypes(List<String> paymentTypes) {
        this.paymentTypes = String.join(", ", paymentTypes);
    }

    public double getTotalExpenses() {
        return totalExpense;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpense = totalExpenses;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }
}
