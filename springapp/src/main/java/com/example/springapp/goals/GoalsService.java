package com.examly.springapp.goals;

import java.util.List;
import java.util.Optional;

public interface GoalsService {
   public Goal createGoal(Goal goal);

   public Goal updateGoal(Long id, Goal goal);

   public void deleteGoal(Long id);

   public Optional<Goal> getGoal(Long id);

    public List<Goal> getAllGoals();
}
