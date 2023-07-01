package com.example.springapp.controller;

import com.example.springapp.account.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BudgetController {

    //Test Case
    @GetMapping("/budget")
    public ResponseEntity<List<Account>> getAllBudget(){
        List<Account> accounts = new ArrayList<>();
        return ResponseEntity.ok(accounts);
    }

    //Test Case
    @GetMapping("/budget/{id}")
    public ResponseEntity<List<Account>> getBudgetById(@PathVariable Integer id){
        List<Account> accounts = new ArrayList<>();
        return ResponseEntity.ok(accounts);
    }
}
