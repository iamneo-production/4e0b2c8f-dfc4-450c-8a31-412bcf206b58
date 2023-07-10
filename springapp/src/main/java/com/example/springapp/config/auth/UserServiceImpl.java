package com.example.springapp.config.auth;

import com.example.springapp.BaseResponceDto;
import com.example.springapp.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JavaMailSender mailSender;
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


	@Override
	public String sendVerificationEmail(String email) throws MessagingException, UnsupportedEncodingException, MessagingException, UnsupportedEncodingException {
		String fromAddress = "paymint.ltd@outlook.com";
		String senderName = "Paymint Team";
		String subject = "Paymint account security code";
		String content = "<div>\n" +
				"    <span style=\"color:#808080;padding: 2px;font-family: sans-serif;\">Paymint Account</span><br>\n" +
				"    <span style=\"color:#5C6AC4;padding: 2px;font-size:32px;font-family: sans-serif;\"><b>Security code</b></span><br><br>\n" +
				"    <span style=\"font-family: sans-serif;\">Please use the following security code for the Paymint account.</span><br><br><br>\n" +
				"    <span style=\"font-family: sans-serif;\">Security code: <b>[[CODE]]</b></span><br><br><br>\n" +
				"    <span style=\"font-family: sans-serif;\">Thanks,</span><br>\n" +
				"    <span style=\"font-family: sans-serif;\">The Paymint Team</span>\n" +
				"</div>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(fromAddress, senderName);
		helper.setTo(email);
		helper.setSubject(subject);
		String code = new DecimalFormat("000000").format(new Random().nextInt(999999));
		content = content.replace("[[CODE]]", code);
		helper.setText(content, true);
		mailSender.send(message);
		return code;
	}
}
