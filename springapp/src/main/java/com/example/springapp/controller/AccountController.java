package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.account.Account;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/accounts")
    public List<Account> getAllAccount(){
        return null;
    }

    @GetMapping("/accounts/{id}")
    public List<Account> getAccountById(@PathVariable Integer id){
        return null;
    }
}
