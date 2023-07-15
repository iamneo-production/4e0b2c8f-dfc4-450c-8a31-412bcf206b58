package com.example.springapp.debt;

import com.example.springapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DebtRepo extends JpaRepository<DebtEntity,Integer> {
    List<DebtEntity> findAllByUser(UserEntity user);
    List<DebtEntity> findAllByUserOrderByDueDateAsc(UserEntity user);

    List<DebtEntity> findAllByUserOrderByAmountDesc(UserEntity user);
}
