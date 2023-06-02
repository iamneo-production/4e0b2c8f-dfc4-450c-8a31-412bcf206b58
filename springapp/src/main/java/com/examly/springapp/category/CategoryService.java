package com.examly.springapp.category;

import com.examly.springapp.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService {
    @Autowired
     CategoryRepository categoryRepository;
    public List<Category> getCategories(){

        return categoryRepository.findAll();

    }

    public boolean addCategories(Category category){

        categoryRepository.save(category);
        return true;

    }
}
