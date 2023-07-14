package com.example.springapp.controller;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.config.auth.JWTGenerator;
import com.example.springapp.debt.DebtEntity;
import com.example.springapp.debt.DebtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DebtController {

    @Autowired
    JWTGenerator jwtGenerator;

    @Autowired
    private DebtService debtS;

    @PostMapping("/api/debts")
    public ResponseEntity<BaseResponceDto> createDebts(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody DebtEntity debt){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        DebtEntity debt1=debtS.debtCreate(debt,userName);
        return ResponseEntity.ok(new BaseResponceDto("success",debt1));
    }

    @GetMapping("/api/debts/user")
    public ResponseEntity<List<DebtEntity>> getDebts(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam("value") Integer value){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<DebtEntity> Response= debtS.debtGet(userName,value);
        HttpHeaders httpHead=new HttpHeaders();
        httpHead.add("info","getting the list of Debt Values");
        return ResponseEntity.status(HttpStatus.OK).headers(httpHead).body(Response);
    }

    @DeleteMapping("/api/debts")
    public ResponseEntity<String> deleteDebts(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam("debtId") Integer id){
        String Resp=debtS.debtDelete(id);
        HttpHeaders httpHead=new HttpHeaders();
        return ResponseEntity.status(HttpStatus.ACCEPTED).headers(httpHead).body(Resp);
    }

    @PutMapping("/api/debts")
    public ResponseEntity<DebtEntity> updateDebts(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody DebtEntity debt){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        Integer id= debt.getDebtId();
        DebtEntity debt1=debtS.debtUpdate(debt, id);
        HttpHeaders httpHead=new HttpHeaders();
        httpHead.add("info","updated the Debt Value of "+id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).headers(httpHead).body(debt1);
    }


    @GetMapping("/api/debts")
    public  ResponseEntity<List<DebtEntity>> debtofAll(){
        List<DebtEntity> Response =debtS.getAllDebts();
        HttpHeaders httpHead=new HttpHeaders();
        httpHead.add("info","getting the list of Debt Values");
        return ResponseEntity.status(HttpStatus.OK).headers(httpHead).body(Response);
    }

}
