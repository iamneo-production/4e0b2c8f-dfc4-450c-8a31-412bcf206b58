package com.example.springapp.transaction;

import com.example.springapp.user.UserEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    public List<Transaction> getTransactionsByUserName(String userName) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            return transactionRepository.findAllByUser(user);
        }catch (UsernameNotFoundException e){
            return null;
        }
    }
}
