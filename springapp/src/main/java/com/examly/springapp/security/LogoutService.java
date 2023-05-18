package com.examly.springapp.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.examly.springapp.token.TokenRepository;

@Service
public class LogoutService implements LogoutHandler {
	@Autowired
	private TokenRepository tokenRepository;

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		
		String authHeader = request.getHeader("Authorization");
		String jwt;
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		jwt = authHeader.substring(7);
		var storedToken = tokenRepository.findByToken(jwt).orElse(null);
		if(storedToken != null) {
			storedToken.setExpired(true);
			storedToken.setRevoked(true);
			tokenRepository.save(storedToken);
		}

	}

}
