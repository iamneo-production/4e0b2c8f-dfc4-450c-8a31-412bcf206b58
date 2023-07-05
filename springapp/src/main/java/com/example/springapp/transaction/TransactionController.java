package com.example.springapp.transaction;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.config.auth.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @Autowired
    JWTGenerator jwtGenerator;

    @GetMapping("/api/transactions")
    public BaseResponceDto getTransactions(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<Transaction> transactions = transactionService.getTransactionsByUserName(userName);
        return new BaseResponceDto("Success", transactions);
    }

    @PostMapping("/api/transactions")
    public BaseResponceDto addTransactions(@RequestHeader(value = "Authorization", defaultValue = "") String token, @RequestBody TransactionRequestDto transactionRequestDto) {
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        transactionService.addTransaction(transactionRequestDto, userName);
        return new BaseResponceDto("success", null);
    }

    @DeleteMapping("/api/transactions/{transaction_id}")
    public BaseResponceDto deleteTransaction(@RequestHeader(value = "Authorization", defaultValue = "") String token,@PathVariable String transaction_id) {
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        if(transactionService.hasTransaction(transaction_id)){
            if(transactionService.hasPermission(userName,transaction_id)){
                transactionService.deleteTransaction(Integer.parseInt(transaction_id));
                return new BaseResponceDto("success");
            }else {
                return new BaseResponceDto("couldn't delete transaction");
            }
        }else {
            return new BaseResponceDto("transaction not found");
        }
    }
}
