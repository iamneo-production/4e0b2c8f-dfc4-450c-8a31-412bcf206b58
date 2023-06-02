package com.examly.springapp.category;

import com.examly.springapp.user.UserEntity;

import javax.persistence.*;
import java.util.Date;
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int categoryId;
    private  String name;
    @ManyToOne
    @JoinColumn(name= "user_id")
    private UserEntity userId;//Type of userIdentity
    private  boolean isIncome;
    private boolean isDeleted;

    private  Date createdAt;
    private  Date updatedAt;

    public UserEntity getUserId() {
        return userId;
    }

    public void setUserId(UserEntity userId) {
        this.userId = userId;
    }

    public int getCategoryId() {

        return categoryId;
    }

    public void setCategoryId(int categoryId) {

        this.categoryId = categoryId;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public boolean isIncome() {

        return isIncome;
    }

    public void setIncome(boolean income) {

        isIncome = income;
    }

    public boolean isDeleted() {

        return isDeleted;
    }

    public void setDeleted(boolean deleted) {

        isDeleted = deleted;
    }

    public Date getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {

        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {

        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {

        this.updatedAt = updatedAt;
    }
}
