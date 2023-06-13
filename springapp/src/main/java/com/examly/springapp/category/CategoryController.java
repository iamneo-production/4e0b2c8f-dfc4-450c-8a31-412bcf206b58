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
    public BaseResponceDto getCategories(@RequestHeader(value = "Authorization", defaultValue = "") String token) {

        if (jwtGenerator.validateToken(token)) {
            String userName = jwtGenerator.getUsernameFromJWT(token);
            List<Category> categories = categoryService.getCategoriesByUserName(userName);
            return new BaseResponceDto("Success", categories);
        }
        return new BaseResponceDto("UnAuthorization", null);


    }

    @PostMapping("/api/categories")
    public BaseResponceDto addCategories(@RequestHeader(value = "Authorization", defaultValue = "") String token, @RequestBody Category category) {
        if (jwtGenerator.validateToken(token)) {
            String userName = jwtGenerator.getUsernameFromJWT(token);
            categoryService.addCategories(category, userName);
            return new BaseResponceDto(categoryService.addCategories(category, userName), null);
        }
        return new BaseResponceDto("UnAuthorization", null);


    }
    @DeleteMapping("/api/categories/{category_id}")
    public String deleteCourse(@PathVariable String category_id) {
        return this.categoryService.deleteCategories(Integer.parseInt(category_id));
    }


}
