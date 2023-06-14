package com.examly.springapp.category;

import com.examly.springapp.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private UserEntity userId;//Type of userIdentity
    private  boolean isIncome;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean isDeleted;

    @CreationTimestamp
    private  Date createdAt;
    @UpdateTimestamp
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

    public boolean getIsIncome() {

        return isIncome;
    }

    public void setIsIncome(boolean income) {

        isIncome = income;
    }

    public boolean getIsDeleted() {

        return isDeleted;
    }

    public void setIsDeleted(boolean deleted) {

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
