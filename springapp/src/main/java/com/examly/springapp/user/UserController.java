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
	public String register(@RequestBody UserEntity user) {
		return userService.register(user);
	}
	
	@PostMapping("/api/login")
	public String login(@RequestBody LoginDto user) {

		UserEntity u = userRepository.findByEmail(user.getEmail()).orElse(null);
		if(!userRepository.existsByEmail(user.getEmail())) {
	    	//System.out.println(user.getEmail());
	    	return "Incorrect Email or Password...";
	    }
		if(!new BCryptPasswordEncoder().matches(user.getPassword(), u.getPassword())) {
	    	return "Incorrect Email or Password...";
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
        return token;
	}
	
	@GetMapping("/api/home")
	public String home(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
		//System.out.println(token);
		if(jwtGenerator.validateToken(token)) {
			return "welcome";
		}
		return "unauthorized";
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