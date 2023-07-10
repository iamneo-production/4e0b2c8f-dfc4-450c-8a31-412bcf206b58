package com.example.springapp.user;

import com.example.springapp.BaseResponceDto;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface UserService {

	ResponseEntity<BaseResponceDto> register(UserEntity user);

    void updateUserProfileImage(ProfileImageDto profileImageDto, String userName);

    void updateUserProfileName(ProfileNameDto profileNameDto, String userName);

    void updateUserProfileEmail(ProfileEmailDto profileEmailDto, String userName);

    String sendVerificationEmail(String email) throws MessagingException, UnsupportedEncodingException;
}

