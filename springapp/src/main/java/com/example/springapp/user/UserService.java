package com.example.springapp.user;

import com.example.springapp.BaseResponceDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

	ResponseEntity<BaseResponceDto> register(UserEntity user);

}

