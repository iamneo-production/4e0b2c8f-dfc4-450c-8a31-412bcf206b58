package com.example.springapp.user;

import com.example.springapp.BaseResponceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.springapp.config.auth.LoginDto;
import com.example.springapp.config.auth.JWTGenerator;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
public class UserController {
	@Autowired
	private UserService userService;

	private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    public UserController(AuthenticationManager authenticationManager, UserRepository userRepository,
                           PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

	@PostMapping("/api/register")
	public ResponseEntity<BaseResponceDto> register(@RequestBody UserEntity user) {
		return userService.register(user);
	}

	@PostMapping("/api/login")
	public ResponseEntity<BaseResponceDto> login(@RequestBody LoginDto user) {

		UserEntity u = userRepository.findByEmail(user.getEmail()).orElse(null);
		if(!userRepository.existsByEmail(user.getEmail())) {
			return new ResponseEntity<>(new BaseResponceDto("Incorrect Email or Password...",null), HttpStatus.BAD_REQUEST);
		}
		if(!new BCryptPasswordEncoder().matches(user.getPassword(), u.getPassword())) {
			return new ResponseEntity<>(new BaseResponceDto("Incorrect Email or Password...",null), HttpStatus.BAD_REQUEST);
		}
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
		Map<Object,Object> data = new HashMap<>();
		data.put("token",token);
        return ResponseEntity.ok(new BaseResponceDto("success",data));
	}

	@GetMapping("/api/validateToken")
	public ResponseEntity<BaseResponceDto> home(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
		Map<Object,Object> data = new HashMap<>();
		if(jwtGenerator.validateToken(token)) {
			Optional<UserEntity> user = userRepository.findByEmail(jwtGenerator.getUsernameFromJWT(token));
			data.put("user",user);
			return ResponseEntity.ok(new BaseResponceDto("success",data));
		}
		return new ResponseEntity<>(new BaseResponceDto("unauthorized",data), HttpStatus.UNAUTHORIZED);
	}

}