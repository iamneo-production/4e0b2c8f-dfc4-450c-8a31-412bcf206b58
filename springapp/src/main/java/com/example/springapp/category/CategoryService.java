package com.example.springapp.category;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;
    public List<Category> getCategoriesByUserName(String userName){
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            return categoryRepository.findAllByUserId(user);
        }catch (UsernameNotFoundException e){
            return null;
        }


    }

    public String addCategories(Category category, String userName){
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            category.setUserId(user);
            categoryRepository.save(category);
            return "success";
        }catch (UsernameNotFoundException e){
            return e.getMessage();
        }

    }
    public String deleteCategories(int category_TD){
        try{
            Category entity=categoryRepository.getOne(category_TD);
            categoryRepository.delete(entity);
        }catch (Exception e){
            return e.getMessage();
        }
        return "success";

    }

}
