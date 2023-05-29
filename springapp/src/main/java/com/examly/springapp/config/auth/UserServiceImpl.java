package com.examly.springapp.config.auth;

import com.examly.springapp.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.user.UserEntity;
import com.examly.springapp.user.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
	public ResponseEntity<?> register(UserEntity user) {
		
		if(userRepository.existsByEmail(user.getEmail())) {
			return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
		}
		
		user.setPassword(passwordEncoder.encode((user.getPassword())));
		userRepository.save(user);
		return new ResponseEntity<>("Register successfully", HttpStatus.OK);
	}
	

}
