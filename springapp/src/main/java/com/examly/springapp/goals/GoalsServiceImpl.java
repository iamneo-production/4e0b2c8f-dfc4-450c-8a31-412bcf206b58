package com.examly.springapp.goals;


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
        Optional<Goal> existingGoal = goalsRepository.findById(id);
        if (existingGoal.isPresent()) {
            updatedGoal.setId(id);
            return goalsRepository.save(updatedGoal);
        } else {
            throw new IllegalArgumentException("Goal with ID " + id + " does not exist.");
        }
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

    public List<Goal> getAllGoals() {
        return goalsRepository.findAll();
    }
}
