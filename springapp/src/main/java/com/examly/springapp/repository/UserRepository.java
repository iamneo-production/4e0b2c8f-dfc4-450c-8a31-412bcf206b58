package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
}
