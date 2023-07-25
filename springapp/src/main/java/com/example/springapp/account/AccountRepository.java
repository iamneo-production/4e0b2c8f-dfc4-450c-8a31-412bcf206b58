package com.example.springapp.account;

import com.example.springapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {

    List<Account> findAllByUser(UserEntity user);

    List<Account> findAllByUserAndIsDeletedFalse(UserEntity user);
}
