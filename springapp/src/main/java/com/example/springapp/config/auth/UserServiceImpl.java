package com.example.springapp.config.auth;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;

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
		return new ResponseEntity<>(new BaseResponceDto("success",null), HttpStatus.OK);
	}
	

}
