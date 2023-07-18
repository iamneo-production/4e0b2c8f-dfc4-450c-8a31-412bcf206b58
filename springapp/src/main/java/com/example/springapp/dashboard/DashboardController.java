package com.example.springapp.dashboard;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.account.AccountService;
import com.example.springapp.config.auth.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @Autowired
    JWTGenerator jwtGenerator;

    @Autowired
    AccountService accountService;

    @GetMapping("/api/dashboard/monthly-data")
    public ResponseEntity<BaseResponceDto> getMonthlyData(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<Map<String, Object>>  data = dashboardService.getMonthlyData(userName);
        return ResponseEntity.ok(new BaseResponceDto("success",data));
    }

    @GetMapping("/api/dashboard/this-month/expenses")
    public ResponseEntity<BaseResponceDto> getThisMonthExpenses(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<Map<String, Object>>  data = dashboardService.getThisMonthExpenses(userName);
        return ResponseEntity.ok(new BaseResponceDto("success",data));
    }

    @GetMapping("/api/dashboard/this-month/income")
    public ResponseEntity<BaseResponceDto> getThisMonthIncome(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        List<Map<String, Object>>  data = dashboardService.getThisMonthIncome(userName);
        return ResponseEntity.ok(new BaseResponceDto("success",data));
    }

    @GetMapping("/api/dashboard/this-month/total/income-and-expenses")
    public ResponseEntity<BaseResponceDto> getThisMonthTotalIncomeAndExpenses(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
        Map<String, Object>  data = dashboardService.getThisMonthTotalIncomeAndExpenses(userName);
        return ResponseEntity.ok(new BaseResponceDto("success",data));
    }



}
