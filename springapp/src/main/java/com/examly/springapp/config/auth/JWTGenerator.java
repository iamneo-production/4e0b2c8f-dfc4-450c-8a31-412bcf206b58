package com.examly.springapp.config.auth;

import java.util.Date;

import com.examly.springapp.config.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.examly.springapp.config.token.TokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTGenerator {
	
	@Autowired
	TokenRepository tokenRepository;
	
	public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET)
                .compact();
        return token;
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SecurityConstants.JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
    	//System.out.println(token);
    	var validToken = tokenRepository.findByToken(token).get();
    	//System.out.println(validToken.getRevoked());
    	boolean check = validToken.getExpired() && validToken.getRevoked();
    	if(!check) {
    		try {
                Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token);
                return true;
            } catch (Exception ex) {
                throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
            }
    	}else {
    		return false;
    	}
        
    }
}
