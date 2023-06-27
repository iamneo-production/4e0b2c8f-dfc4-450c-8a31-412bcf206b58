package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
