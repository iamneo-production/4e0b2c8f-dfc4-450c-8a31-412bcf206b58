package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.account.Account;
import com.example.springapp.budget.Budget;
import com.example.springapp.budget.BudgetRequestDto;
import com.example.springapp.budget.BudgetService;
import com.example.springapp.category.Category;
import com.example.springapp.category.CategoryService;
import com.example.springapp.config.auth.JWTGenerator;
import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
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

    @Autowired
    JWTGenerator jwtGenerator;

    @Autowired
    CategoryService categoryService;

    @Autowired
    UserRepository userRepository;

    //API EndPoint for fetching all the existing Budget
    @GetMapping("/api/budgets")
    public ResponseEntity<BaseResponceDto> getAllBudgets(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
        UserEntity user = userRepository.findByEmail(jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token))).orElseThrow();
        List<Budget> budgets = budgetService.getAllBudgetByUser(user);
        return new ResponseEntity<>(new BaseResponceDto("success",budgets), HttpStatus.OK);
    }


    //API EndPoint for fetching a particular Budget
    @GetMapping("/api/budgets/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable("id") Long id) {
        Budget budget = budgetService.getBudgetById(id).orElse(null);
        if (budget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }


    //API EndPoint for creating a Budget
    @PostMapping("/api/budgets")
    public ResponseEntity<BaseResponceDto> createBudget(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody BudgetRequestDto budgetRequestDto) {
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        if(!budgetService.hasAlready(userName,budgetRequestDto.getCategoryId())){
            Budget createdBudget = budgetService.createBudget(budgetRequestDto,userName);
            return new ResponseEntity<>(new BaseResponceDto("success",createdBudget), HttpStatus.CREATED);
        }else {
            return ResponseEntity.ok(new BaseResponceDto("Already exist"));
        }
    }

    //API EndPoint for Updating an existing Budget
    @PutMapping("/api/budgets/{id}")
    public ResponseEntity<BaseResponceDto> updateBudget(@PathVariable("id") Long id, @RequestBody BudgetRequestDto budgetRequestDto) {
        Budget existingBudget = budgetService.getBudgetById(id).orElse(null);
        if (existingBudget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Category category = categoryService.getCategoryById(budgetRequestDto.getCategoryId());
        existingBudget.setCategory(category);
        existingBudget.setAmount(budgetRequestDto.getAmount());
        budgetService.updateBudget(existingBudget);
        return new ResponseEntity<>(new BaseResponceDto("success"), HttpStatus.OK);
    }

    //API EndPoint for Deleting an existing Budget
    @DeleteMapping("api/budgets/{id}")
    public ResponseEntity<BaseResponceDto> deleteBudget(@PathVariable("id") Long id) {
        Budget budget = budgetService.getBudgetById(id).orElse(null);
        if (budget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        budgetService.deleteBudget(id);
        return ResponseEntity.ok(new BaseResponceDto("success"));
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

