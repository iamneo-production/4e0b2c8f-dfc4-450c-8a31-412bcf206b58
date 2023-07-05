package com.example.springapp.account;

import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AccountService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    public void addAccount(Account account, String userName) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            account.setUser(user);
            accountRepository.save(account);
        }catch (Exception ignored){

        }
    }

    public List<Account> getAccountsByUsername(String userName) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            return accountRepository.findAllByUser(user);
        }catch (Exception e){
            return null;
        }
    }

    public void deleteAccount(String accountId) {
        try{
            Account entity= accountRepository.getOne(Integer.valueOf(accountId));
            accountRepository.delete(entity);
        }catch (Exception ignored){
        }
    }

    public boolean hasAccount(String accountId) {
        try{
            Account entity= accountRepository.getOne(Integer.valueOf(accountId));
            return entity.getAccountId() == Integer.parseInt(accountId);
        }catch (Exception ignored){
            return false;
        }
    }

    public boolean hasPermission(String userName, String accountId) {
        try{
            UserEntity user = userRepository.findByEmail(userName).orElseThrow();
            Account entity= accountRepository.getOne(Integer.valueOf(accountId));
            return Objects.equals(entity.getUser().getUserId(), user.getUserId());
        }catch (Exception ignored){
            return false;
        }
    }

    public Account getAccountById(Integer id){
        return accountRepository.findById(id).orElseThrow();
    }
}
