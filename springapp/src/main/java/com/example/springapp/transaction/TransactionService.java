package com.example.springapp.transaction;

import com.example.springapp.account.Account;
import com.example.springapp.category.Category;
import com.example.springapp.user.UserEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.springapp.category.CategoryService;
import com.example.springapp.account.AccountService;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    AccountService accountService;

    public List<Transaction> getTransactionsByUserName(String userName) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            return transactionRepository.findAllByUser(user);
        }catch (UsernameNotFoundException e){
            return null;
        }
    }

    public void addTransaction(TransactionRequestDto transactionRequestDto, String userName) {
        Account account = accountService.getAccountById(transactionRequestDto.getAccountId());
        Category category = categoryService.getCategoryById(transactionRequestDto.getCategoryId());
        UserEntity user = userRepository.findByEmail(userName).orElseThrow();
        Transaction transaction = new Transaction(
                transactionRequestDto.getAmount(),
                transactionRequestDto.getDescription(),
                transactionRequestDto.getType(),
                transactionRequestDto.getPaymentType(),
                category,
                account,
                user
        );
        transactionRepository.save(transaction);
    }
}
