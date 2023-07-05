package com.example.springapp.account;

import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
