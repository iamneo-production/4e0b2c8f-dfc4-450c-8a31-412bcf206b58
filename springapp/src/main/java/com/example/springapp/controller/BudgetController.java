package com.example.springapp.controller;

import com.example.springapp.account.Account;
import com.example.springapp.budget.Budget;
import com.example.springapp.budget.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    //API EndPoint for fetching all the existing Budget
    @GetMapping("/api/budget")
    public ResponseEntity<List<Budget>> getAllBudgets() {
        List<Budget> budgets = budgetService.getAllBudget();
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }


    //API EndPoint for fetching a particular Budget
    @GetMapping("/api/budget/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable("id") Long id) {
        Budget budget = budgetService.getBudgetById(id).orElse(null);
        if (budget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }


    //API EndPoint for creating a Budget
    @PostMapping("/api/budget")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget) {
        Budget createdBudget = budgetService.createBudget(budget);
        return new ResponseEntity<>(createdBudget, HttpStatus.CREATED);
    }

    //API EndPoint for Updating an existing Budget
    @PutMapping("/api/budget/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable("id") Long id, @RequestBody Budget budget) {
        Budget existingBudget = budgetService.getBudgetById(id).orElse(null);
        if (existingBudget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingBudget.setBudgetId(budget.getBudgetId());
        existingBudget.setCategory(budget.getCategory());
        existingBudget.setAmount(budget.getAmount());

        Budget updatedBudget = budgetService.updateBudget(id,existingBudget);
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    //API EndPoint for Deleting an existing Budget
    @DeleteMapping("api/budget/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable("id") Long id) {
        Budget budget = budgetService.getBudgetById(id).orElse(null);
        if (budget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        budgetService.deleteBudget(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

        //Test Case
        @GetMapping("/budget")
        public ResponseEntity<List<Account>> getAllBudget () {
            List<Account> accounts = new ArrayList<>();
            return ResponseEntity.ok(accounts);
        }

        //Test Case
        @GetMapping("/budget/{id}")
        public ResponseEntity<List<Account>> getBudgetById (@PathVariable Integer id){
            List<Account> accounts = new ArrayList<>();
            return ResponseEntity.ok(accounts);
        }
    }

