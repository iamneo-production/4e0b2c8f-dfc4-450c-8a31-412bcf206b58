package com.examly.springapp.config.auth;

import com.examly.springapp.BaseResponceDto;
import com.examly.springapp.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.user.UserEntity;
import com.examly.springapp.user.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
	public ResponseEntity<BaseResponceDto> register(UserEntity user) {
		if(userRepository.existsByEmail(user.getEmail())) {
			return new ResponseEntity<>(new BaseResponceDto("User already exists",null), HttpStatus.BAD_REQUEST);
		}
		
		user.setPassword(passwordEncoder.encode((user.getPassword())));
		userRepository.save(user);
		return new ResponseEntity<>(new BaseResponceDto("register successfully",null), HttpStatus.OK);
	}
	

}
