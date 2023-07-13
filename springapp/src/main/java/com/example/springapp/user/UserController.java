package com.example.springapp.user;

import com.example.springapp.BaseResponceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.springapp.config.auth.LoginDto;
import com.example.springapp.config.auth.JWTGenerator;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
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

	@PostMapping("/api/auth/register")
	public ResponseEntity<BaseResponceDto> register(@RequestBody UserEntity user) {
		return userService.register(user);
	}

	@PostMapping("/api/auth/login")
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
		if(jwtGenerator.validateToken(jwtGenerator.getTokenFromHeader(token))) {
			Optional<UserEntity> user = userRepository.findByEmail(jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token)));
			data.put("user",user);
			return ResponseEntity.ok(new BaseResponceDto("success",data));
		}
		return new ResponseEntity<>(new BaseResponceDto("unauthorized",data), HttpStatus.UNAUTHORIZED);
	}

	@PostMapping("/api/profile/image")
	public ResponseEntity<BaseResponceDto> updateProfilePicture(@RequestHeader(value = "Authorization", defaultValue = "") String token,@ModelAttribute ProfileImageDto profileImageDto){
		try {
			String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
			System.out.println("done----------------------------------------------");
			userService.updateUserProfileImage(profileImageDto,userName);
			return ResponseEntity.ok(new BaseResponceDto("success"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponceDto("Failed to update user profile image."));
		}
	}

	@PostMapping("/api/profile/name")
	public ResponseEntity<BaseResponceDto> updateProfileName(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody ProfileNameDto profileNameDto){
		try {
			String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
			userService.updateUserProfileName(profileNameDto,userName);
			return ResponseEntity.ok(new BaseResponceDto("success"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponceDto("Failed to update user profile name."));
		}
	}

	@PostMapping("/api/profile/email")
	public ResponseEntity<BaseResponceDto> updateProfileName(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody ProfileEmailDto profileEmailDto){
		try {
			String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
			userService.updateUserProfileEmail(profileEmailDto,userName);
			return ResponseEntity.ok(new BaseResponceDto("success"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponceDto("Failed to update user profile email."));
		}
	}


	@PostMapping("/api/send-verification-email")
	public ResponseEntity<BaseResponceDto> sendVerificationEmail(@RequestParam(value = "email") String email){
		try{
			String code = userService.sendVerificationEmail(email);
			Map<String,Object> data = new HashMap<>();
			data.put("security-code",code);
			return ResponseEntity.ok(new BaseResponceDto("success",data));
		} catch (MessagingException | UnsupportedEncodingException e) {
			return ResponseEntity.internalServerError().body(new BaseResponceDto("Failed try again"));
		}

	}
	
	@PutMapping("/api/profile/password")
	public ResponseEntity<BaseResponceDto> updatePassword(@RequestHeader(value = "Authorization", defaultValue = "") String token, @RequestBody ProfilePasswordDto profilePasswordDto){
		try {
			String userName = jwtGenerator.getUsernameFromJWT(jwtGenerator.getTokenFromHeader(token));
			return userService.updatePassword(profilePasswordDto, userName);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponceDto("Failed to update user profile password!"));
		}
	}
}