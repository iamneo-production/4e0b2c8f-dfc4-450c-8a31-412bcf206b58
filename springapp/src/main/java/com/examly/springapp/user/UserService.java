package com.examly.springapp.user;

import com.examly.springapp.BaseResponceDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

	ResponseEntity<BaseResponceDto> register(UserEntity user);

}

