package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.account.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AccountController {
    @PostMapping("/api/accounts")
    public BaseResponceDto createAccount(){
        return new BaseResponceDto("create account",null);
    }
    @GetMapping("/api/accounts")
    public BaseResponceDto getAccount(){
        return new BaseResponceDto("get account",null);
    }
    @DeleteMapping("/api/accounts")
    public BaseResponceDto deleteAccount(){
        return new BaseResponceDto("delete account",null);
    }


    //Test Case
    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccount(){
        List<Account> accounts = new ArrayList<>();
        return ResponseEntity.ok(accounts);
    }

    //Test Case
    @GetMapping("/accounts/{id}")
    public ResponseEntity<List<Account>> getAccountById(@PathVariable Integer id){
        List<Account> accounts = new ArrayList<>();
        return ResponseEntity.ok(accounts);
    }
}
