package com.examly.springapp.user;

import org.springframework.http.ResponseEntity;

public interface UserService {

	ResponseEntity<?> register(UserEntity user);

}

