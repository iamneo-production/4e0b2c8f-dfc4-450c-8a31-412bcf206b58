package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.account.Account;
import com.example.springapp.account.AccountResponseDto;
import com.example.springapp.account.AccountService;
import com.example.springapp.config.auth.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AccountController {

    @Autowired
    JWTGenerator jwtGenerator;

    @Autowired
    AccountService accountService;

    @PostMapping("/api/accounts")
    public BaseResponceDto createAccount(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody Account account){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        accountService.addAccount(account,userName);
        return new BaseResponceDto("success");
    }

    @PutMapping("/api/accounts")
    public BaseResponceDto updateAccount(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody Account account,@RequestParam String accountId){
        accountService.updateAccount(account,Integer.valueOf(accountId));
        return new BaseResponceDto("success");
    }

    @GetMapping("/api/accounts")
    public BaseResponceDto getAccount(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<AccountResponseDto> accounts = accountService.getAccountsByUsername(userName);
        return new BaseResponceDto("success",accounts);
    }
    @DeleteMapping("/api/accounts")
    public BaseResponceDto deleteAccount(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String accountId){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        if(accountService.hasAccount(accountId)){
            if(accountService.hasPermission(userName,accountId)){
                accountService.deleteAccount(accountId);
                return new BaseResponceDto("success");
            }else {
                return new BaseResponceDto("couldn't delete account");
            }
        }else {
            return new BaseResponceDto("account not found");
        }
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
