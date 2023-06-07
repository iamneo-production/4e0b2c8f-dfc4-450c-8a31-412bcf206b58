package com.examly.springapp.category;

import com.examly.springapp.BaseResponceDto;
import com.examly.springapp.config.auth.JWTGenerator;
import com.examly.springapp.user.UserEntity;
import com.examly.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @Autowired
    JWTGenerator jwtGenerator;
    @Autowired

    UserRepository userRepository;
    @GetMapping("/api/categories")
    public BaseResponceDto getCategories(@RequestHeader(value = "Authorization", defaultValue = "") String token){

        if(jwtGenerator.validateToken(token)) {
            Optional<UserEntity> user = userRepository.findByEmail(jwtGenerator.getUsernameFromJWT(token));
            return new BaseResponceDto("Success",categoryService.getCategories());
        }
        return new BaseResponceDto("Failed",null);


    }
    @PostMapping("/api/categories")
    public String addCategories(@RequestHeader(value = "Authorization", defaultValue = "") String token, @RequestBody Category category){
        if(jwtGenerator.validateToken(token)) {

            Optional<UserEntity> user = userRepository.findByEmail(jwtGenerator.getUsernameFromJWT(token));
            categoryService.addCategories(category);
            return "Categories Added";
        }
        return "Unauthorised";






    }

}
