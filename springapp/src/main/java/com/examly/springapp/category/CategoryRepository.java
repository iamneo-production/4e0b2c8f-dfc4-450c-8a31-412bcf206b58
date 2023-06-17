package com.examly.springapp.category;

import com.examly.springapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
    public List<Category> findAllByUserId(UserEntity userId);

}
