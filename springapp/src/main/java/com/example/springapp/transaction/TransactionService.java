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
import java.util.Objects;

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
                transactionRequestDto.getPaymentType(),
                transactionRequestDto.getDateTime(),
                category,
                account,
                user
        );
        transactionRepository.save(transaction);
        if(category.getType().equals("expense")){
            accountService.debitBalance(account,transactionRequestDto.getAmount());
        }else if(category.getType().equals("income")) {
            accountService.creditBalance(account,transactionRequestDto.getAmount());
        }
    }

    public boolean hasTransaction(String transactionId) {
        try{
            Transaction entity= transactionRepository.findById(Integer.valueOf(transactionId)).orElseThrow();
            return entity.getId() == Integer.parseInt(transactionId);
        }catch (Exception ignored){
            return false;
        }
    }

    public boolean hasPermission(String userName, String transactionId) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            Transaction entity= transactionRepository.findById(Integer.valueOf(transactionId)).orElseThrow();
            return Objects.equals(entity.getUser().getUserId(), user.getUserId());
        }catch (Exception ignored){
            return false;
        }
    }

    public void deleteTransaction(int id) {
        try{
            Transaction entity= transactionRepository.findById(id).orElseThrow();
            transactionRepository.delete(entity);
        }catch (Exception ignored){
        }
    }
}
