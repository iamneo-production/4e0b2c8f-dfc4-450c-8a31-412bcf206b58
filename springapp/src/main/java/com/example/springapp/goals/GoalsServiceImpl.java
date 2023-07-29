package com.example.springapp.goals;


import com.example.springapp.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalsServiceImpl implements GoalsService {

    @Autowired
    private GoalsRepository goalsRepository;


    public Goal createGoal(Goal goal) {
        return goalsRepository.save(goal);
    }

    public Goal updateGoal(Long id, Goal updatedGoal) {
        Goal existingGoal = goalsRepository.findById(id).orElseThrow();
        existingGoal.setName(updatedGoal.getName());
        existingGoal.setDescription(updatedGoal.getDescription());
        existingGoal.setStatus(updatedGoal.getStatus());
        existingGoal.setTargetAmount(updatedGoal.getTargetAmount());
        existingGoal.setTargetDate(updatedGoal.getTargetDate());
        return goalsRepository.save(existingGoal);
    }

    public void deleteGoal(Long id) {
        Optional<Goal> existingGoal = goalsRepository.findById(id);
        if (existingGoal.isPresent()) {
            goalsRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Goal with ID " + id + " does not exist.");
        }
    }

    public Optional<Goal> getGoal(Long id) {
        return goalsRepository.findById(id);
    }

    public List<Goal> getAllGoalsByUser(UserEntity user) {
        return goalsRepository.findAllByUser(user);
    }
}
