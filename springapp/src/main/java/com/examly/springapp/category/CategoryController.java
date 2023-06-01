package com.examly.springapp.category;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @GetMapping("/api/categories")
    public String getCategories(){
    return("Categories got");

    }
    @PostMapping("/api/categories")
    public String addCategories(){
         return("AddCategories");

    }

}
