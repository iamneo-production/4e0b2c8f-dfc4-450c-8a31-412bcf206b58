package com.example.springapp.transaction;

import com.example.springapp.account.Account;
import com.example.springapp.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    List<Transaction> findAllByUser(UserEntity user);


    List<Transaction> findAllByAccount(Account account);
    
    @Query(value="select * from transaction where category_category_id=?1", nativeQuery = true)
    List<Transaction> findByCategory(Integer id);
}
