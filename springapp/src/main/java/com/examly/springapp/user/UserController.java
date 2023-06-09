package com.examly.springapp.user;

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

import com.examly.springapp.config.auth.LoginDto;
import com.examly.springapp.user.UserEntity;
import com.examly.springapp.user.UserRepository;
import com.examly.springapp.config.auth.JWTGenerator;
import com.examly.springapp.user.UserService;
import com.examly.springapp.config.token.Token;
import com.examly.springapp.config.token.TokenRepository;
import com.examly.springapp.config.token.TokenType;


@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;
    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    public UserController(AuthenticationManager authenticationManager, UserRepository userRepository,
                           PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }
	
	@PostMapping("/api/register")
	public ResponseEntity<?> register(@RequestBody UserEntity user) {
		return userService.register(user);
	}
	
	@PostMapping("/api/login")
	public ResponseEntity<?> login(@RequestBody LoginDto user) {

		UserEntity u = userRepository.findByEmail(user.getEmail()).orElse(null);
		if(!userRepository.existsByEmail(user.getEmail())) {
	    	//System.out.println(user.getEmail());
	    	return new ResponseEntity<>("Incorrect Email or Password...", HttpStatus.BAD_REQUEST);
	    }
		if(!new BCryptPasswordEncoder().matches(user.getPassword(), u.getPassword())) {
	    	return new ResponseEntity<>("Incorrect Email or Password...", HttpStatus.BAD_REQUEST);
	    }

		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
		//System.out.print(user.getEmail()+" "+user.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        
        Token t = new Token();
        t.setUser(u);
        t.setToken(token);
        t.setTokenType(TokenType.BEARER);
        t.setRevoked(false);
        t.setExpired(false);
        revokeAllUserTokens(u);
        tokenRepository.save(t);
        return ResponseEntity.ok(token);
	}
	
	@GetMapping("/api/home")
	public ResponseEntity<?> home(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
		//System.out.println(token);
		if(jwtGenerator.validateToken(token.substring(7))) {
			return ResponseEntity.ok("welcome");
		}
		return new ResponseEntity<>("unauthorized or token expired", HttpStatus.UNAUTHORIZED);
	}

	@PostMapping("/api/logout")
	public ResponseEntity<?> logout(@RequestHeader(value="Authorization", defaultValue = "")String token){
		// System.out.println("outside method"+" "+token);
		if(jwtGenerator.validateToken(token.substring(7))) {
//			System.out.println("in method"+" "+token);
			var storedToken = tokenRepository.findByToken(token.substring(7)).orElse(null);
//			System.out.println(storedToken);
			if(storedToken != null) {
				storedToken.setExpired(true);
				storedToken.setRevoked(true);
				tokenRepository.save(storedToken);
			}
			return ResponseEntity.ok("Logout successfully");
		}
		return new ResponseEntity<>("invalid token", HttpStatus.UNAUTHORIZED);
	}
	
	private void revokeAllUserTokens(UserEntity user) {
		var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
		if(validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(t -> {
			t.setExpired(true);
			t.setRevoked(true);
		});
		tokenRepository.saveAll(validUserTokens);
	}
}