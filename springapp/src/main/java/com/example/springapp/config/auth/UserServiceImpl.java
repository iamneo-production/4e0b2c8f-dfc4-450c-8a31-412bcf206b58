package com.example.springapp.config.auth;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

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

	@Override
	public void updateUserProfileImage(ProfileImageDto profileImageDto, String userName) {
		try{
			UserEntity user = userRepository.findByEmail(userName).orElseThrow();
			user.setProfileImage(profileImageDto.getImage().getBytes());
			userRepository.save(user);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void updateUserProfileName(ProfileNameDto profileNameDto, String userName) {
		UserEntity user = userRepository.findByEmail(userName).orElseThrow();
		user.setFirstName(profileNameDto.getFirstName());
		user.setLastName(profileNameDto.getLastName());
		userRepository.save(user);
	}

	@Override
	public void updateUserProfileEmail(ProfileEmailDto profileEmailDto, String userName) {
		UserEntity user = userRepository.findByEmail(userName).orElseThrow();
		user.setEmail(profileEmailDto.getEmail());
		userRepository.save(user);
	}


}
