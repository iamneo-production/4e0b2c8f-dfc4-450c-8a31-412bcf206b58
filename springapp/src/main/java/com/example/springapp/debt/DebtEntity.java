package com.example.springapp.debt;

import com.example.springapp.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DebtEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer debtId;

    @ManyToOne
    @JoinColumn(name = "main_user")
    private UserEntity user;

    private double amount;
    private String dueDate;
    private String moneyFrom;
    private String status;
    public void setUser(UserEntity user) {
        this.user = user;
    }

}
